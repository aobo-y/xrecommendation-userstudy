import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Tag, Icon, Collapse, Empty, ConfigProvider, Carousel } from 'antd';


const renderEmpty = () => <Empty description="Please answer the questions first..." />

const Images = ({urls}) => {
  return (
    <div style={{width: 252}}>
      <Carousel autoplay>
        {
          urls.map(url => (
            <div key={url}>
              <div style={{textAlign: 'center', width: 252, height: 182}}>
                <img  src={url} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="restaurants" />
              </div>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

class ItemList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    onExpand: PropTypes.func.isRequired
  }

  render() {
    const { items, onExpand } = this.props;

    return (
      <ConfigProvider renderEmpty={renderEmpty}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={items}
          footer={<div><b>{items.length}</b> items</div>}
          rowKey={item => item.id}
          renderItem={item => (
            <List.Item
              extra={item.images ? <Images urls={item.images}/> : undefined}
            >
              <List.Item.Meta
                title={
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
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
              {
                Boolean(item.exp.length) && (
                  <Collapse defaultActiveKey={[]} bordered={false} onChange={onExpand}>
                    <Collapse.Panel
                      key="1"
                      header={<><Icon type="solution" style={{ marginRight: 8 }} />Explanation</>}
                      style={{border: 0}}
                    >
                      <p>{`From your history, we think you will like its features: ${item.exp.join(', ')}`}</p>
                    </Collapse.Panel>
                  </Collapse>
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
