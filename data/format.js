const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const command = args[0] || '';

function genUserNodes() {
  const nodes = require('./yelp_user_node').map(node => {
    return {
      id: node.NodeId,
      feature: node.Feature_Name.trim(),
      isLeaf: node.Isleafnode === 'true',
      splitValue: node.Feature_SplitValue,
      gtId: node.Childnode_Greater_Id,
      nGtId: node.Childnode_NoGreater_Id,
      unknownId: node.Childnode_Unknown_Id,
      vector: node.User_vector.split(' ').map(n => Number(n))
    };
  });

  console.log('Generate user nodes...');
  fs.writeFileSync(path.join(__dirname, '../src/data/user_nodes.json'), JSON.stringify(nodes));
}

function genItemNodes() {
  const nodes = require('./yelp_item_node').map(node => {
    return {
      id: node.NodeId,
      feature: node.Feature_Name.trim(),
      parentId: node.Parent_NodeId,
      isLeaf: node.Isleafnode === 'true'
    };
  });

  console.log('Generate item nodes...');
  fs.writeFileSync(path.join(__dirname, '../src/data/item_nodes.json'), JSON.stringify(nodes));
}

function genItemList() {
  console.log('Generate item list...');

  const contents = fs.readFileSync(path.join(__dirname, './yelp.featuremap'), {
    encoding: 'utf-8'
  });

  const list = contents
    .split('\n')
    .map(line => line.split('='))
    .reduce((prev, line) => {
      const idx = Number(line[0]);
      prev[idx] = line[1]
      return prev;
    }, []);

  fs.writeFileSync(path.join(__dirname, '../src/data/item_list.json'), JSON.stringify(list));
}

function genItemVectors() {
  console.log('Generate item vectors...');

  const contents = fs.readFileSync(path.join(__dirname, './yelp.itemvectors'), {
    encoding: 'utf-8'
  });

  const vectors = contents
    .split('\n')
    .map(line => line.split(' ').map(n => Number(n)))

  fs.writeFileSync(path.join(__dirname, '../src/data/item_vector.json'), JSON.stringify(vectors));
}


switch (command.toLowerCase()) {
  case 'usernodes':
    genUserNodes();
    break;

  case 'itemnodes':
    genItemNodes();
    break;

  case 'itemlist':
    genItemList();
    break;

  case 'itemvectors':
    genItemVectors();
    break;

  default:
    genUserNodes();
    genItemNodes();
    genItemList();
    genItemVectors();
    break;
}
