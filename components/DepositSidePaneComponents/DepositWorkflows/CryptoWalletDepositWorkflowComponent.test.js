import React from 'react';
import { mount } from 'enzyme';
import CryptoWalletDepositWorkflowComponent from './CryptoWalletDepositWorkflowComponent';

jest.mock('redux-form', () => {
  return {
    Field: props => {
      const Component = props.component;

      return <Component {...props} component="" meta={{}} />;
    }
  };
});

describe('CryptoWalletDepositWorkflowComponent', () => {
  const buildSubject = (props = { addressList: [] }) =>
    mount(<CryptoWalletDepositWorkflowComponent {...props} />, {
      context: { t: v => v }
    });

  it('should render CryptoWalletDepositWorkflowComponent', () => {
    const subject = buildSubject();

    expect(subject).toHaveLength(1);
  });

  it('should render a wallet address', () => {
    const subject = buildSubject({ addressList: ['1', '2', '3', '4'] });

    expect(subject.find('.cryptowallet-deposit__address').length).toBe(1);
  });
});
