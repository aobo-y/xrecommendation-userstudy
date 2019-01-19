import math from 'mathjs';
import TinyQueue from 'tinyqueue';

import amazonList from '../data/amazon/item_list';
import amazonFmfVectorsData from '../data/amazon/fMf/item_vectors';
import amazonMFCTVectorsData from '../data/amazon/MFCT/item_vectors';
import amazonMFCTNodes from '../data/amazon/MFCT/item_nodes';

const allData = {
  amazon: {
    fMf: {vectors: amazonFmfVectorsData},
    MFCT: {
      nodes: amazonMFCTNodes,
      vectors: amazonMFCTVectorsData
    },

    list: amazonList
  },
  yelp: {}
}

let itemList;
let itemNodes;
let itemVectors;

const setContext = (set, model) => {
  itemList = allData[set].list;
  itemNodes = allData[set][model].nodes;
  itemVectors = math.matrix(allData[set][model].vectors);
}

const getNode = id => itemNodes[id - 1];

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

    const exp = [];
    let node = getNode(item.parentId);
    while(node) {
      if (node.feature) {
        exp.push(node.feature);
      }
      node = node.parentId < 0 ? null : getNode(node.parentId);
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
