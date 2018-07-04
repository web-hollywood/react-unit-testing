import React from 'react';
import PropTypes from 'prop-types';

import TrustpayDepositWorkflowComponent from './PaymentProcessors/TrustpayDepositWorkflowComponent';
import RazorPayDepositWorkflowComponent from './PaymentProcessors/RazorPayDepositWorkflowComponent';
import PsigateDepositWorkflowComponent from './PaymentProcessors/PsigateDepositWorkflowComponent';
import InterswitchDepositWorkflowComponent from './PaymentProcessors/InterswitchDepositWorkflowComponent';
import FennasDepositWorkflowComponent from './PaymentProcessors/FennasDepositWorkflowComponent';

const GenericPaymentWorkflowComponent = ({ depositInfo }) => {
  const {
    PaymentAPI,
    URL,
    RedirectURL,
    SerializedPaymentTransactionObject
  } = JSON.parse(depositInfo[0]);

  if (RedirectURL) {
    window.location = RedirectURL;
    return <p>Redirecting...</p>;
  }

  if (PaymentAPI === 'TrustPay') {
    return <TrustpayDepositWorkflowComponent url={URL} />;
  }

  if (SerializedPaymentTransactionObject) {
    const options = JSON.parse(SerializedPaymentTransactionObject);

    if (PaymentAPI === 'Razorpay') {
      return <RazorPayDepositWorkflowComponent options={options} />;
    }
    if (PaymentAPI === 'Psigate') {
      return (
        <PsigateDepositWorkflowComponent options={{ ...options, Email: '' }} />
      );
    }
    if (PaymentAPI === 'Interswitch') {
      return <InterswitchDepositWorkflowComponent options={options} />;
    }
    if (PaymentAPI === 'Fennas') {
      return <FennasDepositWorkflowComponent options={options} />;
    }
  }
  return null;
};

GenericPaymentWorkflowComponent.defaultProps = {
  depositInfo: []
};

GenericPaymentWorkflowComponent.propTypes = {
  depositInfo: PropTypes.array.isRequired
};

export default GenericPaymentWorkflowComponent;
