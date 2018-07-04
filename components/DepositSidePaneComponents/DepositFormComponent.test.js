import React from 'react';
import { shallow } from 'enzyme';
import DepositFormComponent from './DepositFormComponent';

describe('DepositFormComponent', () => {
  let subject = null;
  let submitting;
  let reset;
  let onSubmitResponse;
  let handleSubmit;
  let closeSidePane;
  let depositInfo;
  let products;
  let selectDepositProduct;
  let selectDepositProductResponse;

  beforeEach(() => {
    subject = null;
    submitting = false;
    reset = jest.fn();
    depositInfo = {
      template: {},
      templateInfo: {},
      isLoading: false,
      error: '',
      depositInfo: {},
      depositStatus: { success: false }
    };
    products = [];
    handleSubmit = fn => fn;
    closeSidePane = jest.fn();
    onSubmitResponse = Promise.resolve();
    selectDepositProduct = fn => fn;
    selectDepositProductResponse = Promise.resolve();
  });

  const buildSubject = (passedProps = {}) => {
    handleSubmit = jest.fn(() => onSubmitResponse);
    selectDepositProduct = jest.fn(() => selectDepositProductResponse);
    const props = {
      closeSidePane,
      handleSubmit,
      submitting,
      depositInfo,
      products,
      selectDepositProduct,
      ...passedProps
    };

    return shallow(<DepositFormComponent {...props} />, {
      context: { t: v => v }
    });
  };

  it('should render ProductId select', () => {
    subject = buildSubject();
    expect(subject.find('[name="ProductId"]').length).toBe(1);
  });

  it('renders an error message when depositInfo prop has an error in it', () => {
    subject = buildSubject({
      deposit: {
        template: {},
        templateInfo: {},
        isLoading: false,
        error: 'Account provider 0 not found',
        depositInfo: {},
        depositStatus: {}
      }
    });

    expect(subject.find('p.deposit-form__error').text()).toBe(
      'Account provider 0 not found'
    );
  });

  it('renders a loading message when depositInfo prop contains isLoading === true', () => {
    subject = buildSubject({
      deposit: {
        template: {},
        templateInfo: {},
        isLoading: true,
        error: '',
        depositInfo: {},
        depositStatus: {}
      }
    });

    expect(subject.find('p.deposit-form__loading').length).toBe(1);
  });

  it('renders a message when CreateDepositTicket is successful', () => {
    subject = buildSubject({
      deposit: {
        template: {},
        templateInfo: {},
        isLoading: true,
        error: '',
        depositInfo: {},
        depositStatus: { success: true }
      }
    });

    expect(subject.find('.deposit-form__success').length).toBe(1);
  });

  it('calls handleSubmit when submitting form', () => {
    subject = buildSubject();
    subject.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
