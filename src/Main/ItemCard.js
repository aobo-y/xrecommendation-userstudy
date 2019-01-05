import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

import Box from './Box';


class ItemCard extends PureComponent {
  static propTypes = {
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired
  }

  render() {
    const {id, name} = this.props;

    return (
      <Box>
        <p>{id}. {name}</p>
      </Box>
    );
  }
}

export default ItemCard;
