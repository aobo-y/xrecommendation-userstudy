import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { List } from 'antd';

import QuestionItem from './QuestionItem';

class QuestionList extends PureComponent {
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
            <QuestionItem
              id={idx + 1}
              feature={question.feature}
              question={question.question}
              splitValue={question.splitValue}
              submitted={question.submitted}
              onSubmit={question.submitted ? null : v => onSubmit(question.id, v)}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default QuestionList;
