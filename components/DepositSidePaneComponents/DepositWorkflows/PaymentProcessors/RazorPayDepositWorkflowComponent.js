import React from 'react';
import PropTypes from 'prop-types';
import ScriptLoader from '../../../../helpers/scriptLoader';

const RazorpayDepositWorkflowComponent = ({ options }) => (
  <ScriptLoader
    url="https://checkout.razorpay.com/v1/checkout.js"
    onLoadCallback={() => {
      const optionsObj = {
        ...options,
        handler() {
          window.location.href = options.redirectUrl;
        }
      };
      const rzp = new Razorpay(optionsObj); // eslint-disable-line no-undef

      rzp.open();
    }}
  />
);

RazorpayDepositWorkflowComponent.defaultProps = {
  options: {
    key: '',
    amount: '',
    order_id: '',
    handler: '',
    prefill: {
      contact: '',
      email: ''
    }
  }
};

RazorpayDepositWorkflowComponent.propTypes = {
  options: PropTypes.shape({
    key: PropTypes.string,
    amount: PropTypes.string,
    order_id: PropTypes.string,
    handler: PropTypes.string,
    prefill: PropTypes.shape({
      contact: PropTypes.string,
      email: PropTypes.string
    })
  })
};

export default RazorpayDepositWorkflowComponent;
