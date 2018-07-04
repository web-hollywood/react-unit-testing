import React from 'react';
import PropTypes from 'prop-types';
import { templateFormRenderer } from '../../helpers/formTemplateHelper';

import APButton from './../common/APButton';

const DepositTemplateFormComponent = (
  { template, submitting, baseClasses },
  context
) => {
  if (Object.keys(template).length) {
    return (
      <div className={baseClasses('fields')}>
        {templateFormRenderer(template)}
        <APButton
          type="submit"
          disabled={submitting}
          customClass={baseClasses('submit')}>
          {submitting ? context.t('Submitting...') : context.t('SUBMIT')}
        </APButton>
      </div>
    );
  }
  return <div />;
};

DepositTemplateFormComponent.defaultProps = {
  template: {},
  submitting: false,
  baseClasses: () => {}
};

DepositTemplateFormComponent.propTypes = {
  template: PropTypes.object,
  submitting: PropTypes.bool,
  baseClasses: PropTypes.func
};

DepositTemplateFormComponent.contextTypes = {
  t: PropTypes.func.isRequired
};

export default DepositTemplateFormComponent;
