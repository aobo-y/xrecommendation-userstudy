import nodes from '../data/user_nodes.json';

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

