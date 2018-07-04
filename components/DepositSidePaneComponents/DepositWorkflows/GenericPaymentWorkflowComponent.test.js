import React from 'react';
import { mount } from 'enzyme';
import GenericPaymentWorkflowComponent from './GenericPaymentWorkflowComponent';
import TrustpayDepositWorkflowComponent from './PaymentProcessors/TrustpayDepositWorkflowComponent';
import RazorPayDepositWorkflowComponent from './PaymentProcessors/RazorPayDepositWorkflowComponent';
import PsigateDepositWorkflowComponent from './PaymentProcessors/PsigateDepositWorkflowComponent';
import InterswitchDepositWorkflowComponent from './PaymentProcessors/InterswitchDepositWorkflowComponent';
import FennasDepositWorkflowComponent from './PaymentProcessors/FennasDepositWorkflowComponent';

jest.mock('./PaymentProcessors/TrustpayDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);
jest.mock('./PaymentProcessors/RazorPayDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);
jest.mock('./PaymentProcessors/PsigateDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);
jest.mock('./PaymentProcessors/InterswitchDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);
jest.mock('./PaymentProcessors/FennasDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);

describe('GenericPaymentWorkflowComponent', () => {
  const buildSubject = (props = {}) =>
    mount(<GenericPaymentWorkflowComponent {...props} />, {
      context: { t: v => v }
    });
  const depositInfo = JSON.stringify({
    RedirectURL: '',
    URL: '',
    SerializedPaymentTransactionObject: {},
    PaymentAPI: ''
  });

  it('should return null when empty deposit info', () => {
    const subject = buildSubject({ depositInfo: [JSON.stringify({})] });

    expect(subject.instance()).toBe(null);
  });

  it('should render a Redirecting... text when a RedirectURL is sent back', () => {
    const subject = buildSubject({
      depositInfo: [JSON.stringify({ RedirectURL: 'http://example.com' })]
    });

    expect(subject.find('p').text()).toBe('Redirecting...');
  });

  it('should render TrustPay component', () => {
    const subject = buildSubject({
      depositInfo: [JSON.stringify({ PaymentAPI: 'TrustPay' })]
    });

    expect(TrustpayDepositWorkflowComponent).toHaveBeenCalled();
  });

  it('should render Razorpay component', () => {
    const subject = buildSubject({
      depositInfo: [
        JSON.stringify({
          PaymentAPI: 'Razorpay',
          SerializedPaymentTransactionObject: JSON.stringify({})
        })
      ]
    });

    expect(RazorPayDepositWorkflowComponent).toHaveBeenCalled();
  });

  it('should render Psigate component', () => {
    const subject = buildSubject({
      depositInfo: [
        JSON.stringify({
          PaymentAPI: 'Psigate',
          SerializedPaymentTransactionObject: JSON.stringify({})
        })
      ]
    });

    expect(PsigateDepositWorkflowComponent).toHaveBeenCalled();
  });

  it('should render Interswitch component', () => {
    const subject = buildSubject({
      depositInfo: [
        JSON.stringify({
          PaymentAPI: 'Interswitch',
          SerializedPaymentTransactionObject: JSON.stringify({})
        })
      ]
    });

    expect(InterswitchDepositWorkflowComponent).toHaveBeenCalled();
  });

  it('should render Fennas component', () => {
    const subject = buildSubject({
      depositInfo: [
        JSON.stringify({
          PaymentAPI: 'Fennas',
          SerializedPaymentTransactionObject: JSON.stringify({})
        })
      ]
    });

    expect(FennasDepositWorkflowComponent).toHaveBeenCalled();
  });
});
