import math from 'mathjs';
import TinyQueue from 'tinyqueue';

import itemVectorsData from '../data/item_vector';
import itemList from '../data/item_list';

const itemVectors = math.matrix(itemVectorsData);

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

    items.push({
      id: idx + 1,
      name: itemList[idx] || 'Anonymous'
    });
  }

  return items;
};

export default {
  getTopKItems
};
