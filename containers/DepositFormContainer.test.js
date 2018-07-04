import React from 'react';
import thunk from 'redux-thunk';
import { reduxForm } from 'redux-form';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import DepositFormContainer from './DepositFormContainer';
import * as actions from './../redux/actions/depositActions';
import * as selectors from './../redux/selectors/depositWithdrawalSelectors';

jest.mock('./../redux/selectors/depositWithdrawalSelectors', () => {
  return {
    productsListSelector: jest.fn(state =>
      state.products.map(({ Product, ProductId }) => ({ Product, ProductId }))
    )
  };
});

jest.mock(
  './../components/DepositSidePaneComponents/DepositFormComponent',
  () => {
    return () => {
      return <div className="component">Content</div>;
    };
  }
);

jest.mock('redux-form', () => {
  return {
    reduxForm: jest.fn(option => Component => Component)
  };
});

jest.mock('./../redux/actions/depositActions', () => {
  return {
    fetchProductDepositTemplate: jest.fn(() => ({
      type: 'FETCH_PRODUCT_DEPOSIT_TEMPLATE'
    })),
    receiveDepositTemplate: jest.fn(payload => ({
      type: 'RECEIVE_DEPOSIT_TEMPLATE',
      payload
    })),
    submitDeposit: jest.fn(payload => ({
      type: 'SUBMITTING_DEPOSIT',
      payload
    }))
  };
});

describe('DepositFormContainer', () => {
  const mockStore = configureStore();
  const dispatchStub = jest.fn();
  const getStateStub = jest.fn();
  let store, container;
  const initialState = {
    deposit: {
      product: {},
      depositinfo: []
    },
    product: { products: [] },
    products: []
  };

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(<DepositFormContainer store={store} />);
  });

  it('should render DepositFormComponent', () => {
    expect(container.find('.component').length).toBe(1);
  });

  it('should return deposit redux form', () => {
    const reduxFormArgs = reduxForm.mock.calls[0][0];

    expect(reduxFormArgs.form).toBe('createDeposit');
  });

  it('onSubmit should dispatch submitDeposit action', () => {
    const reduxFormArgs = reduxForm.mock.calls[0][0];
    const formValues = { input1: '', input2: '' };
    reduxFormArgs.onSubmit(formValues, store.dispatch);

    expect(store.getActions()).toEqual([
      { type: 'SUBMITTING_DEPOSIT', payload: formValues }
    ]);
  });

  it('Should pass closeSidePane action to component', () => {
    expect(container.childAt(0).prop('closeSidePane')).toBeDefined();
  });

  it('Should pass selectDepositProduct action to component', () => {
    expect(container.childAt(0).prop('selectDepositProduct')).toBeDefined();
  });

  it('selectDepositProduct should dispatch fetchProductDepositTemplate action', () => {
    container.childAt(0).prop('selectDepositProduct')();
    expect(store.getActions()).toEqual([
      { type: 'FETCH_PRODUCT_DEPOSIT_TEMPLATE' }
    ]);
  });

  it('closeSidePane should dispatch closeDepositSidePane action', () => {
    container.childAt(0).prop('closeSidePane')();
    expect(store.getActions()).toEqual([
      { type: 'CLOSE_SIDE_PANE', payload: 'DEPOSITS' }
    ]);
  });
});
