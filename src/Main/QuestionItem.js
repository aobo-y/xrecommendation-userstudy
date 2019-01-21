import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import InputSlider from './InputSlider';

const SliderAnswer = ({
  value,
  submitted,
  onChange,
  onConfirm,
  onUnknown
}) => {
  if (submitted) {
    return <p>Answer: <strong>{value < 0 ? 'Don\'t know' : value}</strong></p>
  }

  return (
    <>
      <InputSlider value={value} onChange={onChange} />
      <Button type="primary" onClick={onConfirm}>Confirm</Button>
      <Button style={{marginLeft: 10}} onClick={onUnknown}>I don't Know</Button>
    </>
  );
}


const RadioAnswer = ({
  value,
  submitted,
  onLike,
  onDislike,
  onUnknown
}) => {
  if (submitted) {
    let answer;
    if (value === 0) {
      answer = 'Dislike';
    } else if (value > 0) {
      answer = 'Like';
    } else {
      answer = 'Don\'t know';
    }

    return <p>Answer: <strong>{answer}</strong></p>
   }

   return (
    <>
      <Button type="primary" onClick={onLike}>Like</Button>
      <Button type="primary" style={{marginLeft: 10}} onClick={onDislike}>Dislike</Button>
      <Button style={{marginLeft: 10}} onClick={onUnknown}>I don't Know</Button>
    </>
  );
}

class QuestionItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    feature: PropTypes.string.isRequired,
    question: PropTypes.string,
    splitValue: PropTypes.number,
    submitted: PropTypes.bool,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    question: null,
    splitValue: null,
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

  onLike = () => {
    this.setState({
      value: 100
    });
    this.props.onSubmit(100);
  }

  onDislike = () => {
    this.setState({
      value: 0
    });
    this.props.onSubmit(0);
  }

  render() {
    const {id, feature, submitted, splitValue, question} = this.props;
    const { value } = this.state;

    return (
      <>
        <p>Q{id}. {question || `How much do you like ${feature}?`}</p>
        {
          splitValue ?
            <SliderAnswer
              value={value}
              submitted={submitted}
              onChange={this.onChange}
              onConfirm={this.onConfirm}
              onUnknown={this.onUnknown}
            /> :
            <RadioAnswer
              value={value}
              submitted={submitted}
              onLike={this.onLike}
              onDislike={this.onDislike}
              onUnknown={this.onUnknown}
            />
        }
      </>
    );
  }
}

export default QuestionItem;
