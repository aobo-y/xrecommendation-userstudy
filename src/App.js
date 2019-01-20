import React, { Component } from 'react';
import { Layout, Icon, Alert } from 'antd';
import shortid from 'shortid';

import Main from './Main';

import styles from './App.module.css';

const { Header, Content, Footer } = Layout;

const id = shortid.generate();

class App extends Component {
  state = {
    end: false
  }

  onEnd = () => {
    this.setState({end: true});
  }

  render() {
    const { end } = this.state;

    return (
      <Layout className="layout">
        <Header>
          <div className={styles.profile}><Icon type="user" /> {id}</div>
          <span className={styles.logo}>Explanation Recommendation System</span>
        </Header>
        {end &&
          <Alert
            message="Successfully Completed"
            description={<>Please follow this link to the <a href="http://www.cs.virginia.edu/~hw5x/HCDM/" rel="noopener noreferrer">survey</a>.</>}
            type="success"
            banner
          />
        }
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
