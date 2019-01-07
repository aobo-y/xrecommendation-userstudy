import React, { PureComponent } from 'react';

import { Card, notification, Button, Icon } from 'antd';

import QuestionCard from './QuestionCard';
import ItemCard from './ItemCard';

import userTree from '../lib/user';
import itemTree from '../lib/item';

import styles from './index.module.css';

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

    if (newNode.isLeaf) {
      this.showNotification();
    }
  }

  showNotification = () => {
    notification.success({
      duration: 0,
      message: 'Successfully Complete',
      description: 'Congratulation! You have answered all questions. Now you can review our final recommendations customized for you. Please follow the button below to tell us how you feel about this experience.',
      btn: (
        <Button type="primary" href="http://www.cs.virginia.edu/~hw5x/HCDM/" target="_blank">
          Survey
        </Button>
      )
    })
  }

  render() {
    const { userNodes, itemNodes } = this.state;

    return (
      <>
        <Card title={(<><Icon type="question" className={styles.icon} />Questions</>)}>
          {
            userNodes.filter(node => !node.isLeaf).map((node, idx) => node.submitted ?
              <QuestionCard key={idx} id={node.id} feature={node.feature} submitted /> :
              <QuestionCard key={idx} id={node.id} feature={node.feature} onSubmit={v => this.onSubmit(node.id, v)} />
            )
          }
        </Card>

        <Card title={(<><Icon type="heart" className={styles.icon} />Recommendations</>)} style={{marginTop: 24}}>
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
