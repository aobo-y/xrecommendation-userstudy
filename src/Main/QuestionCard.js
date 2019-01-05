import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import {Slider} from 'antd';

import Box from './Box';


class QuestionCard extends PureComponent {
  static propTypes = {
    id: propTypes.number.isRequired,
    feature: propTypes.string.isRequired,
    onSubmit: propTypes.func
  }

  render() {
    const {id, feature, onSubmit} = this.props;

    return (
      <Box>
        <p>Q{id}. How much do you like {feature}?</p>
      </Box>
    );
  }
}

export default QuestionCard;
