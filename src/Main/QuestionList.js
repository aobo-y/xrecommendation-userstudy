import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

import QuestionItem from './QuestionItem';

class QuestionList extends Component {
  static propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    const { questions, onSubmit } = this.props;

    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={questions}
        rowKey="id"
        renderItem={(question, idx) => (
          <List.Item>
            {
              question.submitted ?
                <QuestionItem id={idx + 1} feature={question.feature} splitValue={question.splitValue} submitted /> :
                <QuestionItem id={idx + 1} feature={question.feature} splitValue={question.splitValue} onSubmit={v => onSubmit(question.id, v)} />
            }
          </List.Item>
        )}
      />
    );
  }
}

export default QuestionList;
