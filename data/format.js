const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const command = args[0] || '';

const models = ['fMf', 'MFCT'];

function genUserNodes(set) {
  console.log('Generate user nodes...');

  models.forEach(model => {
    const nodes = require(`./${set}/${model}/usernodes.json`).map(node => {
      return {
        id: node.NodeId,
        feature: (model === 'fMf' ? node.Item_Name : node.Feature_Name.toLowerCase()).trim(),
        isLeaf: node.Isleafnode === 'true',
        splitValue: node.Feature_SplitValue || null,
        gtId: node.Childnode_Greater_Id,
        nGtId: node.Childnode_NoGreater_Id,
        unknownId: node.Childnode_Unknown_Id,
        vector: node.User_vector.split(', ').map(n => Number(n))
      };
    });

    if (model === 'MFCT') {
      const questions = require(`./${set}/MFCT/questions.json`);
      const questionMap = require(`./${set}/MFCT/questionmap.json`);

      nodes.forEach(node => {
        if (node.isLeaf) return;

        let question = questionMap[node.feature];
        if (!question) {
          console.error('Cannot map question for feature:', node.feature)
          return;
        }

        if (question.length === 1) {
          question = questions[Number(question) - 1].replace('XXX', node.feature);
        }

        node.question = question;
      })
    }

    fs.writeFileSync(path.join(__dirname, `../src/data/${set}/${model}/user_nodes.json`), JSON.stringify(nodes));
  });
}

function genItems(set) {
  const nodes = require(`./${set}/MFCT/itemnodes.json`).map(node => {
    return {
      id: node.NodeId,
      feature: node.Feature_Name.trim(),
      parentId: node.Parent_NodeId,
      gtId: node.Childnode_Greater_Id,
      nGtId: node.Childnode_NoGreater_Id,
      unknownId: node.Childnode_Unknown_Id,
      isLeaf: node.Isleafnode === 'true',
      items: node.Items
    };
  });

  console.log('Generate item list...');

  const listContents = fs.readFileSync(path.join(__dirname, `./${set}/itemmap.txt`), {
    encoding: 'utf-8'
  });

  const list = listContents
    .split('\n')
    .filter(line => Boolean(line))
    .map(line => line.split('='))
    .reduce((prev, line) => {
      const idx = Number(line[0]);

      if (set === 'yelp') {
        const details = require('./yelp/itemdetails.json');

        const detail = details[line[1]] || {};
        const tagIndex = line[2].indexOf('[');
        const name = line[2].substring(0, tagIndex - 1);
        const tagStr = line[2].substring(tagIndex).replace(/\'/g, '"');
        const tags = JSON.parse(tagStr);
        prev[idx] = {
          name,
          tags,
          url: detail.url,
          images: detail.photos,
          rating: detail.rating
        };
      } else {
        prev[idx] = {
          name: line[2].replace('&amp;', '&'),
          tags: [],
          url: 'https://www.amazon.com/gp/product/' + line[1]
        };
      }

      return prev;
    }, []);

  // add init parrent nodes
  nodes
    .filter(node => node.isLeaf)
    .forEach(node => {
      if (!node.items) return;

      node.items.forEach(item => {
        list[item].parentId = node.id;
      })
    })

  nodes.forEach(node => {
    delete node.items;
  });

  fs.writeFileSync(path.join(__dirname, `../src/data/${set}/item_list.json`), JSON.stringify(list));

  console.log('Generate item nodes...');
  fs.writeFileSync(path.join(__dirname, `../src/data/${set}/MFCT/item_nodes.json`), JSON.stringify(nodes));

  console.log('Generate item vectors...');

  models.forEach(model => {
    const vecContents = fs.readFileSync(path.join(__dirname, `./${set}/${model}/itemvectors.txt`), {
      encoding: 'utf-8'
    });

    const vectors = vecContents
      .split('\n')
      .map(line => line.trim())
      .filter(line => Boolean(line))
      .map(line => line.split(' ').map(n => Number(n)))

    fs.writeFileSync(path.join(__dirname, `../src/data/${set}/${model}/item_vectors.json`), JSON.stringify(vectors));
  });
}


switch (command.toLowerCase()) {
  case 'amazon':
    genUserNodes('amazon');
    genItems('amazon');
    break;

  case 'yelp':
    genUserNodes('yelp');
    genItems('yelp');
    break;

  default:
    genUserNodes('amazon');
    genItems('amazon');
    genUserNodes('yelp');
    genItems('yelp');
    break;
}
