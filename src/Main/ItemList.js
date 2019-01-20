import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tag, Icon, Collapse, Empty, ConfigProvider } from 'antd';


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
          rowKey={item => item.id}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  <a href={`https://www.amazon.com/gp/product/${item.id}`} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                }
              />
              {
                item.tags.map((tag, idx) =>
                  <Tag key={idx} color="blue" style={{marginBottom: 6}}>
                    {tag}
                  </Tag>
                )
              }
              <Collapse defaultActiveKey={[]} bordered={false} >
                <Collapse.Panel
                  key="1"
                  header={<><Icon type="solution" style={{ marginRight: 8 }} />Explanation</>}
                  style={{border: 0}}
                >
                  <p>{`From your history, we think you will like the features ${item.exp.join(', ')}`}</p>
                </Collapse.Panel>
              </Collapse>
            </List.Item>
          )}
        />
      </ConfigProvider>
    );
  }
}

export default ItemList;
