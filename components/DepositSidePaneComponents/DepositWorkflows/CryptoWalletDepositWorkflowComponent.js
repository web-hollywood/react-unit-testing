import React from 'react';
import PropTypes from 'prop-types';
import APQRCode from '../../common/APQRCode/APQRCode';
import { getBEMClasses } from '../../../helpers/cssClassesHelper';
import copyToClipboard from '../../../helpers/clipboardHelper';
import APIcon from './../../common/APIcon';

import '../../../styles/components/CryptoWalletDepositWorkflowComponent.css';

const baseClasses = getBEMClasses('cryptowallet-deposit');

class CryptoWalletDepositWorkflowComponent extends React.Component {
  static propTypes = {
    addressList: PropTypes.arrayOf(PropTypes.string),
    showSnack: PropTypes.func,
    product: PropTypes.shape({
      Product: PropTypes.string,
      ProductId: PropTypes.number,
      ProductFullName: PropTypes.string,
      ProductType: PropTypes.string
    })
  };

  static defaultProps = {
    addressList: [],
    product: { Product: '', ProductId: 0, ProductFullName: '', ProductType: '' }
  };

  static contextTypes = {
    t: PropTypes.func.isRequired
  };

  render() {
    const {
      context,
      props: { addressList, product, showSnack }
    } = this;
    // Protocol prefix for the QR Code, lowercase name with no spaces.
    const depositType = product.ProductFullName.toLowerCase().replace(
      /\W/g,
      ''
    );
    const selectedAddress = addressList.length
      ? addressList[addressList.length - 1]
      : '';

    return (
      <div className={baseClasses('wrapper')}>
        <div className={baseClasses('title')}>
          {context.t('Please read the instructions below')}
        </div>

        <div className={baseClasses('description')}>
          {context.t(
            'Depositing cryptocurrency into the exchange is safe and easy. The address below can always be used to deposit cryptocurrency into your account.'
          )}
        </div>

        <div className={baseClasses('frame')}>
          <div className={baseClasses('qr-code')}>
            <APQRCode
              value={`${depositType}:${selectedAddress}`}
              className={baseClasses('qrcode')}
            />
          </div>
          <div>
            <div className={baseClasses('title')}>{context.t('Address')}:</div>
            <div
              onClick={() => {
                showSnack({
                  id: 'COPY_ADDRESS',
                  text: this.context.t(
                    'The address has been copied to the clipboard.'
                  )
                });
                copyToClipboard(selectedAddress);
              }}
              className={baseClasses('address')}>
              {selectedAddress}
              <APIcon name="copy" customClass={baseClasses('copy-icon')} />
            </div>
            <div className={baseClasses('description')}>
              {context.t(
                'Your account will automatically update after the cryptocurrency network confirms your transaction.'
              )}
            </div>
            <div className={baseClasses('description')}>
              {context.t('The confirmation may take up to 1 hour.')}
            </div>
            <div className={baseClasses('description')}>
              <div>{context.t('1) Send cryptocurrency to this address')}</div>
              <div>
                {context.t('2) Your deposit will automatically be processed')}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CryptoWalletDepositWorkflowComponent;
