import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button
} from 'antd';

class SurveyModel extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    survey: PropTypes.string
  }

  render() {
    const { visible, survey } = this.props;

    return (
      <Modal
        visible={visible}
        footer={null}
        closable={false}
      >
        <h2>Thank you!</h2>
        {survey && <p>Please follow the link below to tell us how you feel about this experience. You will be given the MTurk token to acquire reward there.</p>}
        {survey && <Button type="primary" href={survey} target="_blank">Survey</Button>}
      </Modal>
    );
  }
}

export default SurveyModel;
