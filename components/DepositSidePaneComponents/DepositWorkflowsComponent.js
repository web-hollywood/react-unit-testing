import React from 'react';
import PropTypes from 'prop-types';

import CryptoWalletDepositWorkflowComponent from './DepositWorkflows/CryptoWalletDepositWorkflowComponent';
import ManualDepositWorkflowComponent from './DepositWorkflows/ManualDepositWorkflowComponent';
import GenericPaymentWorkflowComponent from './DepositWorkflows/GenericPaymentWorkflowComponent';

class DepositWorkflowsComponent extends React.Component {
  static propTypes = {
    templateInfo: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    product: PropTypes.object,
    showSnack: PropTypes.func,
    submitting: PropTypes.bool.isRequired
  };

  static defaultProps = {
    templateInfo: {},
    onSubmit: () => {},
    submitting: false
  };

  state = {
    getDepositInfoResponse: {}
  };

  render() {
    const {
      templateInfo: { DepositWorkflow },
      depositInfo = [],
      submitting,
      product,
      onSubmit,
      showSnack
    } = this.props;
    let WorkflowComponent = null;

    switch (DepositWorkflow) {
      case 'CryptoWallet': {
        WorkflowComponent = (
          <CryptoWalletDepositWorkflowComponent
            addressList={depositInfo}
            product={product}
            showSnack={showSnack}
          />
        );
        break;
      }
      case 'ManualDeposit': {
        WorkflowComponent = (
          <ManualDepositWorkflowComponent
            submitting={submitting}
            onSubmit={onSubmit}
            product={product}
          />
        );
        break;
      }
      case 'GenericPayment': {
        if (depositInfo.length) {
          WorkflowComponent = (
            <GenericPaymentWorkflowComponent depositInfo={depositInfo} />
          );
        }
        break;
      }
      default: {
        break;
      }
    }
    return WorkflowComponent;
  }
}

export default DepositWorkflowsComponent;
