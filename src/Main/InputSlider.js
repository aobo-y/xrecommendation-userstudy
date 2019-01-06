import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Slider, Row, Col, InputNumber, Icon } from 'antd';

import styles from './InputSlider.module.css';

class InputSlider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    min: 1,
    max: 100,
    value: 50
  }

  render() {
    return (
      <Row className={styles.row}>
        <Col span={12}>
          <div className={styles.wrapper}>
            <Icon type="frown-o" />
            <Slider
              {...this.props}
            />
            <Icon type="smile-o" />
          </div>
        </Col>
        <Col span={4}>
          <InputNumber
            {...this.props}
            style={{ marginLeft: 16 }}
          />
        </Col>
      </Row>
    );
  }
}

export default InputSlider;
