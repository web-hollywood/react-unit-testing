import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './depositActions';
import apex from '../../apex';
import { selectAccount } from './userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../apex', () => {
  let returnValue = null;

  return {
    connection: {
      GetDepositRequestInfoTemplate: jest.fn(() =>
        Promise.resolve(returnValue)
      ),
      GetDepositInfo: jest.fn(() => Promise.resolve(returnValue)),
      CreateDepositTicket: jest.fn(() => Promise.resolve(returnValue)),
      GetDepositTickets: jest.fn(() => Promise.resolve(returnValue)),
      setReturnValue: value => {
        returnValue = value;
      }
    }
  };
});

describe('depositActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        userInfo: {
          OMSId: 1
        },
        selectedAccountId: 1
      },
      deposit: {
        templateInfo: {
          UseGetDepositWorkflow: true
        }
      }
    });
    store.clearActions();
  });

  describe('fetchProductDepositTemplate action', () => {
    it('should call GetDepositRequestInfoTemplate from apex', async () => {
      apex.connection.setReturnValue({ depositTemplate: {} });
      await store.dispatch(actions.fetchProductDepositTemplate(1));

      expect(
        apex.connection.GetDepositRequestInfoTemplate
      ).toHaveBeenCalledWith({
        ProductId: 1,
        OMSId: 1,
        AccountId: 1
      });
    });

    it(`should dispatch ${
      actions.RECEIVE_DEPOSIT_TEMPLATE
    } action on successful response`, async () => {
      const template = { result: true, Template: {} };
      apex.connection.setReturnValue(template);

      await store.dispatch(actions.fetchProductDepositTemplate(1));

      expect(store.getActions()).toContainEqual({
        type: actions.RECEIVE_DEPOSIT_TEMPLATE,
        payload: template
      });
    });

    it(`should dispatch ${
      actions.RECEIVE_DEPOSIT_TEMPLATE_ERROR
    } action on failed response`, async () => {
      const template = { result: false, errormsg: 'Test error message' };
      apex.connection.setReturnValue(template);

      await store.dispatch(actions.fetchProductDepositTemplate(1));

      expect(store.getActions()).toContainEqual({
        type: actions.RECEIVE_DEPOSIT_TEMPLATE_ERROR,
        payload: template.errormsg
      });
    });
  });

  describe('submitDeposit action', () => {
    it(`should dispatch ${actions.SUBMITTING_DEPOSIT} action`, async () => {
      apex.connection.setReturnValue({ DepositInfo: '[]' });
      await store.dispatch(actions.submitDeposit({}));
      expect(store.getActions()).toContainEqual({
        type: actions.SUBMITTING_DEPOSIT
      });
    });

    it(`should dispatch createDepositTicket`, async () => {
      store = mockStore({
        user: {
          userInfo: { OMSId: 1 },
          selectedAccountId: 1
        },
        deposit: {
          templateInfo: { UseGetDepositWorkflow: false }
        }
      });
      await store.dispatch(actions.submitDeposit({}));
      expect(apex.connection.CreateDepositTicket).toHaveBeenCalled();
    });
  });

  describe('getDepositInfo action', () => {
    it('should call GetDepositInfo from apex', async () => {
      apex.connection.setReturnValue({ DepositInfo: '[]' });
      await store.dispatch(actions.getDepositInfo(1));

      expect(apex.connection.GetDepositInfo).toHaveBeenCalledWith({
        ProductId: 1,
        OMSId: 1,
        AccountId: 1,
        GenerateNewKey: true
      });
    });

    it(`should dispatch ${actions.RECEIVE_DEPOSIT_INFO} action`, async () => {
      const depositInfo = { DepositInfo: '[]', result: true };
      apex.connection.setReturnValue(depositInfo);

      await store.dispatch(
        actions.getDepositInfo({
          ProductId: 1,
          fullname: 'John Doe',
          comments: ''
        })
      );

      expect(store.getActions()).toContainEqual({
        type: actions.RECEIVE_DEPOSIT_INFO,
        payload: []
      });
    });
  });

  describe('getDepositTickets action', () => {
    it('should call getDepositTickets from apex', async () => {
      await store.dispatch(actions.getDepositTickets());

      expect(apex.connection.GetDepositTickets).toHaveBeenCalledWith({
        OMSId: 1,
        AccountId: 1,
        OperatorId: 1
      });
    });

    it(`should dispatch ${
      actions.RECEIVE_DEPOSIT_TICKETS
    } action`, async () => {
      apex.connection.setReturnValue([]);

      await store.dispatch(actions.getDepositTickets());

      expect(store.getActions()).toContainEqual({
        type: actions.RECEIVE_DEPOSIT_TICKETS,
        payload: []
      });
    });
  });

  describe('createDepositTicket action', () => {
    it('should call CreateDepositTicket from apex', async () => {
      const depositInfoPayload = JSON.stringify({
        fullname: 'John Doe',
        comments: ''
      });
      apex.connection.setReturnValue({
        success: true,
        requestCode: 'abcd-efgh-1234-5678'
      });
      await store.dispatch(
        actions.createDepositTicket({
          ProductId: 1,
          amount: 100,
          fullname: 'John Doe',
          comments: ''
        })
      );

      expect(apex.connection.CreateDepositTicket).toHaveBeenCalledWith({
        OMSId: 1,
        OperatorId: 1,
        AccountId: 1,
        RequestUser: 1,
        AssetId: 1,
        Amount: 100,
        DepositInfo: depositInfoPayload,
        Status: 'New'
      });
    });
  });

  it(`should dispatch ${actions.RECEIVE_DEPOSIT_TICKET} action`, async () => {
    const createTicketResponse = {
      success: true,
      requestCode: 'abcd-efgh-1234-5678'
    };
    apex.connection.setReturnValue(createTicketResponse);

    await store.dispatch(
      actions.createDepositTicket({
        ProductId: 1,
        amount: 100,
        fullname: 'John Doe',
        comments: ''
      })
    );

    expect(store.getActions()).toContainEqual({
      type: actions.RECEIVE_DEPOSIT_TICKET,
      payload: createTicketResponse
    });
  });
});
