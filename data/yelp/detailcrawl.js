const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const yelp = require('yelp-fusion');

const apiKey = ''; // yelp api key
const client = yelp.client(apiKey);

async function run() {
  let details;
  try {
    details = require('./itemdetails.json');
  } catch (e) {
    details = {};
  }

  const contents = fs.readFileSync(path.join(__dirname, './itemmap.txt'), {
    encoding: 'utf-8'
  });

  const ids = contents
    .split('\n')
    .map(line => line.trim())
    .filter(line => Boolean(line))
    .map(line => line.split('='))
    .map(tokens => tokens[1])
    .filter(id => id !== '#NAME?')
    .filter(id => !details.hasOwnProperty(id));

  console.log('total ids to crawl:', ids.length);

  const chunks = _.chunk(ids, 1);

  let error = null;
  let chunkCount = 0;

  try {
    for (let chunk of chunks) {
      const results = await Promise.all(chunk.map(id => {
        return client.business(id)
          .catch(err => {
            if (err.statusCode === 301) {
              const res = JSON.parse(err.response.body);
              return client.business(res.error.new_business_id);
            }
            error = err;
          });
      }));

      chunk.forEach((id, idx) => {
        const res = results[idx];
        if (!res || !res.jsonBody) {
          return;
        };

        details[id] = res.jsonBody;
      });

      if (error) {
        break;
      }

      if (++chunkCount === 100) {
        console.log('finished 100 chunks');
        chunkCount = 0;
      }
    }
  } catch (err) {
    error  = err;
  }

  console.log('writitng details...');
  fs.writeFileSync(path.join(__dirname, './itemdetails.json'), JSON.stringify(details));

  if (error) {
    throw error;
  }
}

run().catch(e => {
  console.error(e);
});
