import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import shortid from 'shortid';

import Main from './Main';

import styles from './App.module.css';

const { Header, Content, Footer } = Layout;

const id = shortid.generate();

class App extends Component {
  render() {

    return (
      <Layout className="layout">
        <Header>
          <div className={styles.profile}><Icon type="user" /> {id}</div>
          <span className={styles.logo}>Explanation Recommendation System</span>
        </Header>
        <Content className={styles.content}>
          <Main onEnd={this.onEnd} />
        </Content>
        <Footer className={styles.footer}>
          <a href="http://www.cs.virginia.edu/~hw5x/HCDM/">
            Human-Centric Data Mining Group
          </a>
          &nbsp;@ UVa
        </Footer>
      </Layout>
    );
  }
}

export default App;
