import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import InputSlider from './InputSlider';


class QuestionItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    feature: PropTypes.string.isRequired,
    submitted: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    submitted: false
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
    this.props.onSubmit(this.state.value);
  }

  onUnknown = () => {
    this.setState({
      value: -1
    });
    this.props.onSubmit(-1);
  }

  render() {
    const {id, feature, submitted } = this.props;
    const { value } = this.state;

    return (
      <>
        <p>Q{id}. How much do you like <strong>{feature}</strong>?</p>
        {
          submitted ? (
            <p>Answer: <strong>{value < 0 ? 'Don\'t know' : value}</strong></p>
          ) : (
            <>
              <InputSlider value={value} onChange={this.onChange} />
              <Button type="primary" onClick={this.onConfirm}>Confirm</Button>
              <Button style={{marginLeft: 10}} onClick={this.onUnknown}>I don't Know</Button>
            </>
          )

        }
      </>
    );
  }
}

export default QuestionItem;
