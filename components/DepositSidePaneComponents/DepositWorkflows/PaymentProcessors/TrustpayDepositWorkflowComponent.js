/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types';
import ScriptLoader from '../../../../helpers/scriptLoader';

const TrustpayDepositWorkflowComponent = ({ url }) => (
  <div>
    <form
      action={location.href}
      className="paymentWidgets"
      data-brands="VISA MASTER AMEX"
    />
    <ScriptLoader url={url} />
  </div>
);

TrustpayDepositWorkflowComponent.defaultProps = {
  url: '',
  title: ''
};

TrustpayDepositWorkflowComponent.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string
};

export default TrustpayDepositWorkflowComponent;
