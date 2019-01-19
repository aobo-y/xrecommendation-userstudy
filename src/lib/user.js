import amazonFmfNodes from '../data/amazon/fMf/user_nodes.json';
import amazonMfctNodes from '../data/amazon/MFCT/user_nodes.json';

const allNodes = {
  amazon: {
    fMf: amazonFmfNodes,
    MFCT: amazonMfctNodes
  },

  yelp: {

  }
};


let nodes;

const setContext = (set, model) => { nodes = allNodes[set][model] };

// NodeId starts from 1
const getNodeById = id => nodes[id - 1]


export const getRoot = () => nodes[0];

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
  setContext,

  getRoot,
  nextNode
};

