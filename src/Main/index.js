import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';
import {
  Card,
  notification,
  Button,
  Icon,
  Row,
  Col,
  Alert
} from 'antd';

import QuestionList from './QuestionList';
import ItemList from './ItemList';
import ContextModal from './ContextModal';
import SurveyModal from './SurveyModal';

import userTree from '../lib/user';
import itemTree from '../lib/item';
import surveys from '../lib/surveys';

import styles from './index.module.css';

const ITEM_NUM = 5;

class Main extends PureComponent {
  state = {
    userNodes: [],
    itemNodes: [],
    context: null,
    survey: null,
    expExpanded: false,
    step: null // 'review', 'end'
  }

  componentDidMount() {
    this.setContext();
  }

  setContext = () => {
    let {dataset, model, random} = qs.parse(window.location.search);

    if (this.verifyContext(dataset, model, random)) {
      random = random === 'true';

      userTree.setContext(dataset, model);
      itemTree.setContext(dataset, model, random);

      this.setState({
        userNodes: [userTree.getRoot()],
        context: {dataset, model, random}
      });

      this.showWarning();
      this.startTime = new Date();
    }
  }

  verifyContext = (dataset, model, random) => {
    if (!['amazon', 'yelp'].includes(dataset)) return false;
    if (!['fMf', 'MFCT'].includes(model)) return false;
    if (random && !['true', 'false'].includes(random)) return false;
    return true;
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
      this.setState({
        step: 'review'
      });
      this.showNotification();
    }
  }

  onExpExpand = () => {
    if (this.state.expExpanded) return;
    this.setState({ expExpanded: true });
  }

  onEnd = () => {
    const { context, expExpanded } = this.state;
    const { dataset, model, ..._ } = context;

    const lastEnough = ((new Date()) - this.startTime) > 20000;
    const expChecked = model !== 'MFCT' || expExpanded;

    let survey = null;
    if (lastEnough && expChecked) {
      survey = surveys[dataset][model];
    }

    this.setState({
      step: 'end',
      survey
    });
  }

  showNotification = (showSurvey) => {
    const config = {
      duration: 10,
      message: 'Congratulation!',
      description: 'You have answered all questions. Now please review our final recommendations customized for you. Then click the "Finish" button in the banner to end.'
    };

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
    const { userNodes, itemNodes, context, survey, step } = this.state;

    return (
      <>
        {
          step === 'review' &&
            <Alert
              message="Finish the experiement"
              description={(
                <>
                  Click the <Button type="danger" onClick={this.onEnd}>Finish</Button> to end if you have reviewed the results. Please notice You cannot go back after clicking it.
                </>
              )}
              type="info"
              showIcon
              style={{marginBottom: 24}}
            />
        }

        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={9} xl={7}>
            <Card title={(<><Icon type="question" className={styles.icon} />Questions</>)} style={{marginBottom: 16}}>
              <QuestionList questions={userNodes} onSubmit={this.onSubmit} />
            </Card>
          </Col>

          <Col xs={24} sm={24} md={24} lg={15} xl={17}>
            <Card title={(<><Icon type="heart" className={styles.icon} />Recommendations</>)}>
              <ItemList items={itemNodes} onExpand={this.onExpExpand} />
            </Card>
          </Col>
        </Row>

        <ContextModal visible={!Boolean(context)} onSubmit={this.onContextSubmit} />
        <SurveyModal visible={step === 'end'} survey={survey} />
      </>
    );
  }
}


export default Main;
