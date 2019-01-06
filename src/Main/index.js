import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import QuestionCard from './QuestionCard';
import ItemCard from './ItemCard';

class Main extends PureComponent {
  render() {
    return (
      <>
        <Card title="Questions">
          <QuestionCard id={1} feature="Battery" onSubmit={() => {}} />
          <QuestionCard id={2} feature="Price" onSubmit={() => {}} />
        </Card>

        <Card title="Recommendations" style={{marginTop: 24}}>
          <ItemCard id={1} name="Phone A" />
          <ItemCard id={1} name="Phone B" />
        </Card>
      </>
    );
  }
}


export default Main;
