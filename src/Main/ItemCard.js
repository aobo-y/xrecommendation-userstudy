import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

import Box from './Box';


class ItemCard extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired
  }

  render() {
    const { id, name, tags } = this.props;

    return (
      <Box>
        <p>{id}. {name}</p>
        {
          tags.map((tag, idx) => <Tag key={idx} color="blue">{tag}</Tag>)
        }
      </Box>
    );
  }
}

export default ItemCard;
