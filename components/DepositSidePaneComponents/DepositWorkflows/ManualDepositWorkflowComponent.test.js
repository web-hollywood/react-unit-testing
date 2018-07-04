import React from 'react';
import { mount } from 'enzyme';
import ManualDepositWorkflowComponent from './ManualDepositWorkflowComponent';
import APNumberInput from '../../common/APNumberInput';

jest.mock('redux-form', () => {
  return {
    Field: props => {
      const Component = props.component;

      return <Component {...props} component="" meta={{}} />;
    }
  };
});

jest.mock('../../common/APNumberInput', () => props => (
  <input {...props} value={1} />
));

describe('ManualDepositWorkflowComponent', () => {
  const defaultProps = {
    product: {
      DecimalPlaces: 2
    }
  };
  const buildSubject = (props = {}) =>
    mount(<ManualDepositWorkflowComponent {...props} {...defaultProps} />, {
      context: { t: v => v }
    });

  it('should render ManualDepositWorkflowComponent', () => {
    const subject = buildSubject();

    expect(subject).toHaveLength(1);
  });

  it('should display a button with text PLACE DEPOSIT TICKET when submitting prop is false', () => {
    const subject = buildSubject({ submitting: false });

    expect(subject.find('button').text()).toBe('PLACE DEPOSIT TICKET');
  });

  it('should display a button with text SUBMITTING... when submitting prop is true', () => {
    const subject = buildSubject({ submitting: true });

    expect(subject.find('button').text()).toBe('SUBMITTING...');
  });
});
