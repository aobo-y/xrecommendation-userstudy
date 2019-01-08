import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tag, Icon, Tooltip, Empty, ConfigProvider } from 'antd';

const IconText = ({ type, text, exp }) => (
  <Tooltip
    title={`From your history, we think you will like the features ${exp.join(', ')} of this restaurant.`}
    placement="bottomLeft"
    trigger={['hover', 'click', 'focus']}
  >
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  </Tooltip>
);

const renderEmpty = () => <Empty description="Please answer the questions first..." />

class ItemList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { items } = this.props;

    return (
      <ConfigProvider renderEmpty={renderEmpty}>
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
      </ConfigProvider>
    );
  }
}

export default ItemList;
