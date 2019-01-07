import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tag, Icon } from 'antd';

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class ItemList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { items } = this.props;

    return (
      <List
        itemLayout="vertical"
        size="large"
        dataSource={items}
        footer={<div><b>{items.length}</b> items</div>}
        renderItem={item => (
          <List.Item
            key={item.name}
            actions={[<IconText type="star-o" text="Explanations" />]}
          >
            <List.Item.Meta
              title={item.name}
              description="category"
            />
            {
              item.tags.map((tag, idx) => <Tag key={idx} color="blue">{tag}</Tag>)
            }
          </List.Item>
        )}
      />
    );
  }
}

export default ItemList;
