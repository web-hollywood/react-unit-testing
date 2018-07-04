import React from 'react';
import PropTypes from 'prop-types';

class PsigateDepositWorkflowComponent extends React.Component {
  componentDidMount() {
    this.form.submit();
  }

  render() {
    const { options } = this.props;

    return (
      <div>
        <p>Redirecting to Psigate...</p>
        <form
          id="psigateForm"
          style={{ visibility: 'hidden' }}
          action={options.APIAddress}
          method="post"
          ref={form => (this.form = form)}>
          <input name="MerchantID" type="text" value={options.MerchantID} />
          <input name="PaymentType" type="text" value={options.PaymentType} />
          <input name="OrderID" type="text" value={options.OrderID} />
          <input name="UserID" type="text" value={options.UserID} />
          <input name="SubTotal" type="text" value={options.SubTotal} />
          <input name="CardAction" type="text" value={0} />
          <input
            name="ResponseFormat"
            type="text"
            value={options.ResponseFormat}
          />
          <input name="Email" type="text" value={options.Email} />
          <input name="ThanksURL" type="text" value={options.ThanksURL} />
          <input name="NoThanksURL" type="text" value={options.NoThanksURL} />
        </form>
      </div>
    );
  }
}

PsigateDepositWorkflowComponent.defaultProps = {
  options: {
    MerchantID: '',
    PaymentType: '',
    OrderID: '',
    UserID: '',
    SubTotal: '',
    ResponseFormat: '',
    Email: ''
  }
};

PsigateDepositWorkflowComponent.propTypes = {
  options: PropTypes.shape({
    MerchantID: PropTypes.string,
    PaymentType: PropTypes.string,
    OrderID: PropTypes.string,
    UserID: PropTypes.string,
    SubTotal: PropTypes.string,
    ResponseFormat: PropTypes.string,
    Email: PropTypes.string
  })
};

export default PsigateDepositWorkflowComponent;
