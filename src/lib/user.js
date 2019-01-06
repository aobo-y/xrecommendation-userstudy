import rawNodes from '../data/yelp_user_node.json';

const nodes = rawNodes.map(node => {
  return {
    id: node.NodeId,
    feature: node.Feature_Name.trim(),
    isLeaf: node.Isleafnode === 'true',
    splitValue: node.Feature_SplitValue,
    gtId: node.Childnode_Greater_Id,
    nGtId: node.Childnode_NoGreater_Id,
    unknownId: node.Childnode_Unknown_Id,
    vector: node.User_vector.split(' ')
  };
})

// NodeId starts from 1
const getNodeById = id => nodes[id - 1]


export const root = nodes[0];

export const nextNode = (nodeId, value) => {
  const node = getNodeById(nodeId);
  const { splitValue, gtId, nGtId }  = node;

  let nextId;
  if (value < 0) {
    nextId = node.unknownId;
  } else {
    nextId = value > splitValue ? gtId : nGtId;
  }
  const nextNode = getNodeById(nextId);

  return nextNode;
}

export default {
  root,
  nextNode
};

