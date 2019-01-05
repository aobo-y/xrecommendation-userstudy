import React, { PureComponent } from 'react';
import styles from './Box.module.css';

class Box extends PureComponent {
  render() {
    return (
      <div className={styles.box}>
        {this.props.children}
      </div>
    );
  }
}

export default Box;
