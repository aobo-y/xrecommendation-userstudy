import math from 'mathjs';
import TinyQueue from 'tinyqueue';

import itemVectorsData from '../data/item_vector';
import itemList from '../data/item_list';
import itemNodes from '../data/item_nodes';

const itemVectors = math.matrix(itemVectorsData);

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
  getTopKItems
};
