import React, { PureComponent } from 'react';

import { Card } from 'antd';

import QuestionCard from './QuestionCard';
import ItemCard from './ItemCard';

import userTree from '../lib/user';

class Main extends PureComponent {
  state = {
    userNodes: [userTree.root]
  }

  onSubmit = (nodeId, value) => {
    const newNode = userTree.nextNode(nodeId, value);
    const { userNodes } = this.state;

    userNodes[userNodes.length - 1].submitted = true;
    this.setState({
      userNodes: [...userNodes, newNode]
    });
  }

  render() {
    const { userNodes } = this.state;

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
          <ItemCard id={1} name="Phone A" />
          <ItemCard id={1} name="Phone B" />
        </Card>
      </>
    );
  }
}


export default Main;
