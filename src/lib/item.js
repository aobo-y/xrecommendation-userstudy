import math from 'mathjs';
import TinyQueue from 'tinyqueue';

import amazonList from '../data/amazon/item_list';
import amazonFmfVectorsData from '../data/amazon/fMf/item_vectors';
import amazonMFCTVectorsData from '../data/amazon/MFCT/item_vectors';
import amazonMFCTNodes from '../data/amazon/MFCT/item_nodes';

import yelpList from '../data/yelp/item_list';
import yelpFmfVectorsData from '../data/yelp/fMf/item_vectors';
import yelpMFCTVectorsData from '../data/yelp/MFCT/item_vectors';
import yelpMFCTNodes from '../data/yelp/MFCT/item_nodes';

const allData = {
  amazon: {
    FMF: {vectors: amazonFmfVectorsData},
    FacT: {
      nodes: amazonMFCTNodes,
      vectors: amazonMFCTVectorsData
    },

    list: amazonList
  },
  yelp: {
    FMF: {vectors: yelpFmfVectorsData},
    FacT: {
      nodes: yelpMFCTNodes,
      vectors: yelpMFCTVectorsData
    },

    list: yelpList
  }
}

let itemList;
let itemNodes;
let itemVectors;
let randomExp;

const setContext = (set, model, random) => {
  itemList = allData[set].list;
  itemNodes = allData[set][model].nodes;
  itemVectors = math.matrix(allData[set][model].vectors);

  randomExp = random;
}

const getNode = id => itemNodes ? itemNodes[id - 1] : null;

let noLeafItemNodes;
const genRandomExp = exp => {
  return exp.map(_ => {
    if (!noLeafItemNodes) {
      noLeafItemNodes = itemNodes.filter(node => !node.isLeaf);
    }

    const feature = noLeafItemNodes[Math.floor(Math.random() * noLeafItemNodes.length)].feature;
    const status = [' is positive', ' is negative', ''][Math.floor(Math.random() * 3)];

    return feature + status;
  });
}

const genExp = id => {
  const exp = [];

  let childNode = getNode(id);

  if (!childNode) return exp;

  let node = getNode(childNode.parentId);

  while (node) {
    let str = node.feature;
    switch (childNode.id) {
      case node.gtId:
        str += ' is positive';
        break;

      case node.nGtId:
        str += ' is negative';
        break;

      default:
        break;
    }
    exp.push(str);

    childNode = node;
    node = node.parentId < 0 ? null : getNode(node.parentId);
  }

  return exp;
}


export const getTopKItems = (vector, k) => {
  const result = math.multiply(itemVectors, vector).toArray();

  const idxResult = result.map((value, idx) => {
    return {
      value,
      idx
    };
  });

  const queue = new TinyQueue(idxResult, (a, b) => {
    return b.value - a.value;
  });

  const items = [];
  while (items.length < k) {
    const { idx } = queue.pop();
    const item = itemList[idx];

    let exp = genExp(item.parentId);
    if (randomExp) {
      exp = genRandomExp(exp);
    }

    items.push({
      id: idx,
      ...item,
      exp
    });
  }

  return items;
};

export default {
  setContext,

  getTopKItems
};
