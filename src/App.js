import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import Main from './Main';

import styles from './App.module.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <span className={styles.logo}>Explanation Recommendation System</span>
        </Header>
        <Content className={styles.content}>
          <Main />
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
