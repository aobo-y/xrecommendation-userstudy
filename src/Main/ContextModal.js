import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Form, Radio, Button, Select
} from 'antd';

import scenarios from '../lib/scenarios';

class ContextModal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    dataset: 'yelp',
    scenario: 0
  }

  onDatasetChange = e => {
    this.setState({ dataset: e.target.value });
  }

  onScenarioChange = v => {
    this.setState({ scenario: v });
  }

  onSubmit = () => {
    this.props.onSubmit({...this.state});
  }

  mapScenarioToStr = (scenario) => {
    return scenario.map(step =>  {
      return step.model + (step.random ? ' (random explanation)' : '');
    }).join(' vs ');
  }

  render() {
    const { visible } = this.props;
    const { dataset, scenario } = this.state;

    return (
      <Modal
        title="Choose Context"
        visible={visible}
        footer={null}
        closable={false}
      >
        <Form>
          <Form.Item
            label="Dataset"
          >
            <Radio.Group value={dataset} onChange={this.onDatasetChange}>
              <Radio.Button value="amazon">Amazon</Radio.Button>
              <Radio.Button value="yelp">Yelp</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Scenario"
          >
            <Select
              value={scenario}
              onChange={this.onScenarioChange}
              style={{width: 280}}
            >
              {
                scenarios.map((s, idx) => (
                  <Select.Option key={idx} value={idx}>{idx}. {this.mapScenarioToStr(s)}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={this.onSubmit}>Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default ContextModal;
