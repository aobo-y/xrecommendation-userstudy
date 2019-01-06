import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import Box from './Box';
import InputSlider from './InputSlider';


class QuestionCard extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    feature: PropTypes.string.isRequired,
    onSubmit: PropTypes.func
  }

  state = {
    value: 50,
    submitted: false
  }

  onChange = (value) => {
    this.setState({
      value: value,
    });
  }

  onConfirm = () => {
    this.setState({
      submitted: true,
    });
    this.props.onSubmit(this.state.value);
  }

  onUnknown = () => {
    this.setState({
      submitted: true,
      value: -1
    });
    this.props.onSubmit(-1);
  }

  render() {
    const {id, feature, onSubmit} = this.props;
    const { value, submitted } = this.state;

    return (
      <Box>
        <p>Q{id}. How much do you like {feature}?</p>
        {
          submitted ? (
            <p>Answer: {value < 0 ? 'Don\'t know' : value}</p>
          ) : (
            <>
              <InputSlider value={value} onChange={this.onChange} />
              <Button type="primary" onClick={this.onConfirm}>Confirm</Button>
              <Button style={{marginLeft: 10}} onClick={this.onUnknown}>Don't Know</Button>
            </>
          )

        }
      </Box>
    );
  }
}

export default QuestionCard;
