import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import qs from 'query-string';
import {
  Card,
  notification,
  Button,
  Icon,
  Row,
  Col,
  Alert,
  Steps
} from 'antd';

import QuestionList from './QuestionList';
import ItemList from './ItemList';
import ContextModal from './ContextModal';
import SurveyModal from './SurveyModal';

import userTree from '../lib/user';
import itemTree from '../lib/item';
import scenarios from '../lib/scenarios';
import { getSurvey } from '../lib/surveys';

import styles from './index.module.css';

const ITEM_NUM = 5;

class Main extends PureComponent {
  state = {
    userNodes: [],
    itemNodes: [],
    context: null,
    survey: null,
    expExpanded: false,
    step: -1,
    stepEnd: false
  }

  componentDidMount() {
    this.setContext();
  }

  setContext = () => {
    let {dataset, scenario} = qs.parse(window.location.search);

    if (this.verifyContext(dataset, scenario)) {
      scenario = Number(scenario);

      this.setState({
        context: {dataset, scenario}
      }, () => {
        this.resetStepContext(0);
        this.showWarning();
        this.startTime = new Date();
      });
    }
  }

  verifyContext = (dataset, scenario) => {
    if (!['amazon', 'yelp'].includes(dataset)) return false;
    if (!scenario || !scenarios[Number(scenario)]) return false;
    return true;
  }

  onContextSubmit = context => {
    window.history.pushState({}, null, '?' + qs.stringify(context));
    this.setContext();
  }

  resetStepContext = (step) => {
    const { dataset, scenario } = this.state.context;

    const { model, random } = scenarios[scenario][step];

    userTree.setContext(dataset, model);
    itemTree.setContext(dataset, model, random);

    this.setState({
      userNodes: [userTree.getRoot()],
      itemNodes: [],
      step,
      stepEnd: false
    });
  }

  onSubmit = (nodeId, value) => {
    const newNode = userTree.nextNode(nodeId, value);
    const { userNodes } = this.state;

    userNodes[userNodes.length - 1] = {
      ...userNodes[userNodes.length - 1],
      submitted: true
    };

    this.setState({
      userNodes: newNode.isLeaf ? [...userNodes] : [...userNodes, newNode],
      itemNodes: itemTree.getTopKItems(newNode.vector, ITEM_NUM)
    });

    if (newNode.isLeaf) {
      this.showNotification();
      this.setState({
        stepEnd: true
      })
    }
  }

  onExpExpand = () => {
    if (this.state.expExpanded) return;
    this.setState({ expExpanded: true });
  }

  getSteps = () => {
    const { context } = this.state;
    const { scenario } = context || {};
    return scenarios[scenario] || [];
  }

  onFinishStep = () => {
    const { context, expExpanded, step } = this.state;
    const steps = this.getSteps();

    if (step !== steps.length - 1) {
      // clear question's inner state
      this.setState({
        userNodes: [],
      }, () => {
        this.resetStepContext(step + 1);
      });
      return;
    }

    const { dataset, scenario } = context;

    const lastEnough = ((new Date()) - this.startTime) > 20000;
    // const expChecked = expExpanded;

    let survey = null;
    if (lastEnough) {
      survey = getSurvey(dataset, scenario);
    }

    this.setState({
      step: step + 1,
      survey
    });
  }

  showNotification = () => {
    const config = {
      duration: 10,
      message: 'Congratulation!',
      description: 'You have answered all questions. Now please review our final recommendations customized for you. Then click the "Finish" button in the banner to next step.'
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
    const { userNodes, itemNodes, context, survey, step, stepEnd } = this.state;
    const steps = this.getSteps();

    return (
      <>
        {
          Boolean(steps.length) && (
            <Steps current={step} style={{marginBottom: 24}}>
              {
                steps.map((_, idx) =>
                  <Steps.Step key={idx} title={'System ' + String.fromCharCode(65 + idx)} />
                )
              }
              <Steps.Step title="End" />
            </Steps>
          )
        }

        {
          stepEnd &&
            <Alert
              message="Finish this step"
              description={(
                <>
                  Click the <Button type="danger" onClick={this.onFinishStep}>Finish</Button> to end if you have reviewed the results. Please notice You cannot go back after clicking it.
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
        <SurveyModal visible={step === steps.length} survey={survey} />
      </>
    );
  }
}


export default Main;
