import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Form, Radio, Button, Switch
} from 'antd';

class ContextModal extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    dataset: 'amazon',
    model: 'MFCT',
    random: false
  }

  onDatasetChange = e => {
    this.setState({ dataset: e.target.value });
  }

  onModelChange = e => {
    this.setState({ model: e.target.value });
  }

  onRandomChange = checked => {
    this.setState({ random: checked });
  }

  onSubmit = () => {
    this.props.onSubmit({...this.state});
  }

  render() {
    const { visible } = this.props;
    const { dataset, model, random } = this.state;

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
              {/* <Radio.Button value="yelp">Yelp</Radio.Button> */}
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Model"
          >
            <Radio.Group value={model} onChange={this.onModelChange}>
              <Radio.Button value="fMf">fMf</Radio.Button>
              <Radio.Button value="MFCT">MFCT</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Random Explanation"
          >
            <Switch checked={random} onChange={this.onRandomChange} />,
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
