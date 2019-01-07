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
        renderItem={question => (
          <List.Item key={question.id}>
            {
              question.submitted ?
                <QuestionItem id={question.id} feature={question.feature} submitted /> :
                <QuestionItem id={question.id} feature={question.feature} onSubmit={v => onSubmit(question.id, v)} />
            }
          </List.Item>
        )}
      />
    );
  }
}

export default QuestionList;
