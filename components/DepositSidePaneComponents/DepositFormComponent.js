import React from 'react';
import PropTypes from 'prop-types';
import { getBEMClasses } from '../../helpers/cssClassesHelper';
import DepositTemplateFormComponent from './DepositTemplateFormComponent';
import DepositWorkflowsComponent from './DepositWorkflowsComponent';
import APSelect from '../common/APSelect/APSelect';
import classnames from 'classnames';

import '../../styles/components/DepositFormComponent.css';

const baseClasses = getBEMClasses('deposit-form');
const slidePaneClasses = getBEMClasses('slide-pane');

const DepositFormComponent = (props, context) => {
  const {
    handleSubmit,
    submitting,
    deposit,
    products,
    selectDepositProduct,
    showSnack,
    product,
    changeFieldValue,
    isDasc
  } = props;

  const productList = products.map(prod => ({
    key: prod.ProductId,
    value: prod.ProductId,
    label: prod.ProductFullName
  }));
  productList.unshift({ label: context.t('...Select'), value: 'select' });

  if (deposit.depositInfo.length && isDasc) {
    const dataArr = deposit.depositInfo[0].split('?dt=');
    deposit.template = { exchangeAddress: dataArr[0], memo: dataArr[1] };

    setTimeout(() => {
      //update data outside render
      changeFieldValue('exchangeAddress', deposit.template.exchangeAddress);
      changeFieldValue('memo', deposit.template.memo);
    });
  }

  return (
    <form
      className={classnames('form-inline', slidePaneClasses('body'))}
      onSubmit={handleSubmit}>
      {deposit.depositStatus.success ? (
        <div className={baseClasses('success')}>
          {context.t('Your deposit ticket was created successfully.')}
        </div>
      ) : (
        <div className={baseClasses('form-body')}>
          <div className={baseClasses('title')}>
            {context.t('Select the currency to deposit.')}
          </div>

          <APSelect
            name="ProductId"
            label={context.t('Currency')}
            customClass={baseClasses()}
            onSelect={value => selectDepositProduct(+value)}
            options={productList}
          />

          {deposit.error && (
            <p className={baseClasses('error')}>{deposit.error}</p>
          )}

          {deposit.isLoading && (
            <p className={baseClasses('loading')}>{context.t('Loading...')}</p>
          )}

          {!deposit.depositInfo.length ||
            (isDasc && (
              <DepositTemplateFormComponent
                template={deposit.template}
                submitting={submitting}
                baseClasses={baseClasses}
              />
            ))}

          <DepositWorkflowsComponent
            templateInfo={deposit.templateInfo}
            product={product}
            showSnack={showSnack}
            depositInfo={deposit.depositInfo}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      )}
    </form>
  );
};

DepositFormComponent.defaultProps = {
  deposit: {
    templateInfo: {},
    template: {},
    isLoading: false,
    error: '',
    depositInfo: {},
    depositStatus: {}
  }
};

DepositFormComponent.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  selectDepositProduct: PropTypes.func.isRequired,
  showSnack: PropTypes.func,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      Product: PropTypes.string,
      ProductId: PropTypes.number,
      ProductFullName: PropTypes.string,
      ProductType: PropTypes.string
    })
  ).isRequired,
  deposit: PropTypes.shape({
    templateInfo: PropTypes.object.isRequired,
    template: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    product: PropTypes.number,
    depositInfo: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
      .isRequired,
    depositStatus: PropTypes.shape({
      success: PropTypes.bool,
      RequestCode: PropTypes.string
    }).isRequired
  })
};

DepositFormComponent.contextTypes = {
  t: PropTypes.func.isRequired
};

export default DepositFormComponent;
