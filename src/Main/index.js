import React, { PureComponent } from 'react';

import { Card } from 'antd';

import QuestionCard from './QuestionCard';
import ItemCard from './ItemCard';

import userTree from '../lib/user';
import itemTree from '../lib/item';

const ITEM_NUM = 4;

class Main extends PureComponent {
  state = {
    userNodes: [userTree.root],
    itemNodes: itemTree.getTopKItems(userTree.root.vector, ITEM_NUM)
  }

  onSubmit = (nodeId, value) => {
    const newNode = userTree.nextNode(nodeId, value);
    const { userNodes } = this.state;

    userNodes[userNodes.length - 1].submitted = true;
    this.setState({
      userNodes: [...userNodes, newNode],
      itemNodes: itemTree.getTopKItems(newNode.vector, ITEM_NUM)
    });
  }

  render() {
    const { userNodes, itemNodes } = this.state;

    return (
      <>
        <Card title="Questions">
          {
            userNodes.filter(node => !node.isLeaf).map((node, idx) => node.submitted ?
              <QuestionCard key={idx} id={node.id} feature={node.feature} submitted /> :
              <QuestionCard key={idx} id={node.id} feature={node.feature} onSubmit={v => this.onSubmit(node.id, v)} />
            )
          }
        </Card>

        <Card title="Recommendations" style={{marginTop: 24}}>
          {
            itemNodes.map((item, idx) =>
              <ItemCard key={idx} id={item.id} name={item.name} />
            )
          }
        </Card>
      </>
    );
  }
}


export default Main;
