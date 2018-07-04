import React from 'react';
import PropTypes from 'prop-types';
import { required, biggerThanValue } from '../../../helpers/formValidations';
import { getBEMClasses } from '../../../helpers/cssClassesHelper';
import APInput from '../../common/APInput';
import APNumberInput from '../../common/APNumberInput';
import APButton from '../../common/APButton';

import '../../../styles/components/ManualDepositWorkflowComponent.css';

const baseClasses = getBEMClasses('manual-deposit');

const ManualDepositWorkflowComponent = (props, context) => {
  const { DecimalPlaces } = props.product;

  return (
    <div className={baseClasses('container')}>
      <div className={baseClasses('title')}>{context.t('Deposit Money')}</div>
      <div className={baseClasses('step-item')}>
        <span className={baseClasses('step')}>{context.t('Step 1:')}</span>
        {context.t('Create the deposit ticket.')}
      </div>
      <div className={baseClasses('step-item')}>
        <span className={baseClasses('step')}>{context.t('Step 2:')}</span>
        {context.t('Process deposit instructions on the deposit receipt.')}
      </div>
      <div className={baseClasses('frame')}>
        <APInput
          type="text"
          name="fullname"
          label={context.t('Full Name:')}
          customClass={baseClasses()}
          validate={[required]}
        />
        <APNumberInput
          type="text"
          name="amount"
          label={context.t('Amount:')}
          decimalPlaces={DecimalPlaces}
          customClass={baseClasses()}
          validate={[required, biggerThanValue(0)]}
        />
        <APInput
          name="comments"
          label={context.t('Comments:')}
          customClass={baseClasses()}
          info={context.t(
            'The comment field is optional. Please use it for special instructions.'
          )}
        />
      </div>

      <div className={baseClasses('footer')}>
        <APButton
          customClass={baseClasses()}
          type="submit"
          disabled={props.submitting}
          styleName="additive">
          {props.submitting
            ? context.t('SUBMITTING...')
            : context.t('PLACE DEPOSIT TICKET')}
        </APButton>
      </div>
    </div>
  );
};

ManualDepositWorkflowComponent.defaultProps = {
  onSubmit: () => {},
  submitting: false
};

ManualDepositWorkflowComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

ManualDepositWorkflowComponent.contextTypes = {
  t: PropTypes.func.isRequired
};

export default ManualDepositWorkflowComponent;
