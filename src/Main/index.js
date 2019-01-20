import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import {
  Card,
  notification,
  Button,
  Icon,
  Row,
  Col
} from 'antd';

import QuestionList from './QuestionList';
import ItemList from './ItemList';
import ContextModal from './ContextModal';

import userTree from '../lib/user';
import itemTree from '../lib/item';

import styles from './index.module.css';

const ITEM_NUM = 5;

class Main extends PureComponent {
  static propTypes = {
    onEnd: PropTypes.func.isRequired
  }

  state = {
    userNodes: [],
    itemNodes: [],
    context: null
  }

  componentDidMount() {
    this.setContext();
  }

  setContext = () => {
    const {dataset, model} = qs.parse(window.location.search);

    if (dataset && model) {
      userTree.setContext(dataset, model);
      itemTree.setContext(dataset, model);

      this.setState({
        userNodes: [userTree.getRoot()],
        context: {dataset, model}
      });

      this.showWarning();
      this.startTime = new Date();
    }
  }

  onContextSubmit = context => {
    window.history.pushState({}, null, '?' + qs.stringify(context));
    this.setContext();
  }

  onSubmit = (nodeId, value) => {
    const newNode = userTree.nextNode(nodeId, value);
    const { userNodes } = this.state;

    userNodes[userNodes.length - 1].submitted = true;
    this.setState({
      userNodes: newNode.isLeaf ? [...userNodes] : [...userNodes, newNode],
      itemNodes: itemTree.getTopKItems(newNode.vector, ITEM_NUM)
    });

    if (newNode.isLeaf) {
      const showSurvey = ((new Date()) - this.startTime) > 20000;
      this.showNotification(showSurvey);
    }
  }

  showNotification = (showSurvey) => {
    const config = {
      duration: 0,
      message: 'Congratulation!',
      description: 'You have answered all questions. Now you can review our final recommendations customized for you.',
      onClose: this.props.onEnd.bind(this, showSurvey)
    };

    if (showSurvey) {
      config.btn = (
        <Button type="primary" href="http://yingkebao.top/web/formview/5c439cacfc918f0bcc205db2" target="_blank" rel="noopener noreferrer">
          Survey
        </Button>
      );

      config.description += ' Please follow the button below to tell us how you feel about this experience.';
    }

    notification.success(config);
  }

  showWarning = () => {
    notification.warning({
      duration: 10,
      message: 'Attention',
      description: 'Please rate each feature according to your preference. Your behavior on this page will be recorded, and no token will be given to acquire reward on MTurk if you just randomly assign scores. Thanks!'
    });
  }

  render() {
    const { userNodes, itemNodes, context } = this.state;

    return (
      <>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={9} xl={7}>
            <Card title={(<><Icon type="question" className={styles.icon} />Questions</>)} style={{marginBottom: 16}}>
              <QuestionList questions={userNodes} onSubmit={this.onSubmit} />
            </Card>
          </Col>

          <Col xs={24} sm={24} md={24} lg={15} xl={17}>
            <Card title={(<><Icon type="heart" className={styles.icon} />Recommendations</>)}>
              <ItemList items={itemNodes} />
            </Card>
          </Col>
        </Row>

        <ContextModal visible={!Boolean(context)} onSubmit={this.onContextSubmit} />
      </>
    );
  }
}


export default Main;
