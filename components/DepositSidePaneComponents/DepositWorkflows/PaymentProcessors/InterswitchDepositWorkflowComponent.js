import React from 'react';
import PropTypes from 'prop-types';

class InterswitchDepositWorkflowComponent extends React.Component {
  componentDidMount() {
    this.form.submit();
  }

  render() {
    const { options } = this.props;

    return (
      <div>
        <p>Redirecting to Interswitch...</p>
        <form
          id="interswitchForm"
          style={{ visibility: 'hidden' }}
          action={options.postUrl}
          method="post"
          ref={form => (this.form = form)}>
          <input name="product_id" type="text" value={options.productId} />
          <input name="pay_item_id" type="text" value={options.itemId} />
          <input name="amount" type="text" value={options.amount} />
          <input name="currency" type="text" value={options.currency} />
          <input
            name="site_redirect_url"
            type="text"
            value={options.siteRedirectUrl}
          />
          <input name="txn_ref" type="text" value={options.transRef} />
          <input name="cust_id" type="text" value={options.customerId} />
          <input name="hash" type="text" value={options.hash} />
        </form>
      </div>
    );
  }
}

InterswitchDepositWorkflowComponent.defaultProps = {
  options: {
    postUrl: '',
    productId: '',
    itemId: '',
    amount: '',
    currency: '',
    siteRedirectUrl: '',
    transRef: '',
    customerId: '',
    hash: ''
  }
};

InterswitchDepositWorkflowComponent.propTypes = {
  options: PropTypes.shape({
    postUrl: PropTypes.string,
    productId: PropTypes.string,
    itemId: PropTypes.string,
    amount: PropTypes.string,
    currency: PropTypes.string,
    siteRedirectUrl: PropTypes.string,
    transRef: PropTypes.string,
    customerId: PropTypes.string,
    hash: PropTypes.string
  })
};

export default InterswitchDepositWorkflowComponent;
