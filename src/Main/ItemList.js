import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tag, Icon, Tooltip } from 'antd';

const IconText = ({ type, text, exp }) => (
  <Tooltip title={exp.join(' ')} placement="bottomLeft">
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  </Tooltip>
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
            actions={[<IconText type="solution" text="Explanation" exp={item.exp} />]}
          >
            <List.Item.Meta
              title={item.name}
            />
            {
              item.tags.map((tag, idx) =>
                <Tag key={idx} color="blue" style={{marginBottom: 6}}>
                  {tag}
                </Tag>
              )
            }
          </List.Item>
        )}
      />
    );
  }
}

export default ItemList;
