import React from 'react';
import PropTypes from 'prop-types';

class FennasDepositWorkflowComponent extends React.Component {
  componentDidMount() {
    this.form.submit();
  }

  render() {
    const { options } = this.props;

    return (
      <div>
        <p>Redirecting to Fennas...</p>
        <form
          id="fennasForm"
          style={{ visibility: 'hidden' }}
          action={options.PostUrl}
          method="post"
          ref={form => (this.form = form)}>
          <input name="MerchantID" type="text" value={options.MerchantID} />
          <input
            name="MerchantRefNo"
            type="text"
            value={options.MerchantRefNo}
          />
          <input
            name="MerchantPaysFees"
            type="text"
            value={options.MerchantPaysFees}
          />
          <input
            name="SendJSONCallBack"
            type="text"
            value={options.SendJSONCallBack}
          />
          <input
            name="MerchantLanguage"
            type="text"
            value={options.MerchantLanguage}
          />
          <input
            name="RequestHasCardOrder"
            type="text"
            value={options.RequestHasCardOrder}
          />
          <input
            name="ResponseFormat"
            type="text"
            value={options.ResponseFormat}
          />
          <input
            name="RedirectionURLOK"
            type="text"
            value={options.RedirectionURLOK}
          />
          <input
            name="RedirectionURLFailed"
            type="text"
            value={options.RedirectionURLFailed}
          />
          <input
            name="RedirectionURLCancelled"
            type="text"
            value={options.RedirectionURLCancelled}
          />
          <input
            name="RedirectionURLError"
            type="text"
            value={options.RedirectionURLError}
          />
          <input name="NormalAmount" type="text" value={options.NormalAmount} />
          <input
            name="NormalCurrency"
            type="text"
            value={options.NormalCurrency}
          />
          <input
            name="NormalDescription"
            type="text"
            value={options.NormalDescription}
          />
          <input name="RequestType" type="text" value={options.RequestType} />
          <input name="Version" type="text" value={options.Version} />
          <input name="CheckSum" type="text" value={options.CheckSum} />
        </form>
      </div>
    );
  }
}

FennasDepositWorkflowComponent.defaultProps = {
  options: {
    MerchantID: '',
    MerchantRefNo: '',
    MerchantPaysFees: '',
    SendJSONCallBack: '',
    MerchantLanguage: '',
    RequestHasCardOrder: '',
    ResponseFormat: '',
    RedirectionURLOK: '',
    RedirectionURLFailed: '',
    RedirectionURLCancelled: '',
    RedirectionURLError: '',
    NormalAmount: '',
    NormalCurrency: '',
    NormalDescription: '',
    RequestType: '',
    Version: '',
    CheckSum: ''
  }
};

FennasDepositWorkflowComponent.propTypes = {
  options: PropTypes.shape({
    MerchantID: PropTypes.string,
    MerchantRefNo: PropTypes.string,
    MerchantPaysFees: PropTypes.string,
    SendJSONCallBack: PropTypes.string,
    MerchantLanguage: PropTypes.string,
    RequestHasCardOrder: PropTypes.string,
    ResponseFormat: PropTypes.string,
    RedirectionURLOK: PropTypes.string,
    RedirectionURLFailed: PropTypes.string,
    RedirectionURLCancelled: PropTypes.string,
    RedirectionURLError: PropTypes.string,
    NormalAmount: PropTypes.string,
    NormalCurrency: PropTypes.string,
    NormalDescription: PropTypes.string,
    RequestType: PropTypes.string,
    Version: PropTypes.string,
    CheckSum: PropTypes.string
  })
};

export default FennasDepositWorkflowComponent;
