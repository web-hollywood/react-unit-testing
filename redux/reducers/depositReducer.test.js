import * as actions from '../actions/depositActions';
import {
  closeDepositSidePane,
  CLOSE_SIDE_PANE
} from '../actions/sidePaneActions';
import reducer from './depositReducer';

describe('deposit reducer', () => {
  const initialState = {
    templateInfo: {},
    template: {},
    isLoading: false,
    product: 0,
    error: '',
    depositInfo: [],
    depositStatus: {},
    depositsStatus: []
  };

  it('Sould return initial state', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(initialState);
  });

  it(`Sould handle ${actions.FETCH_PRODUCT_DEPOSIT_TEMPLATE} action`, () => {
    const resultingState = {
      ...initialState,
      product: 1,
      isLoading: true
    };

    const newState = reducer(undefined, actions.fetchingDepositTemplate(1));

    expect(newState).toEqual(resultingState);
  });

  it(`Sould handle ${actions.RECEIVE_DEPOSIT_TEMPLATE} action`, () => {
    const template = {
      Template: {
        ProviderType: 'BitcoinRpc',
        Template: '{}',
        ProcessInfo: '',
        UseGetDepositWorkflow: true,
        DepositWorkflow: 'CryptoWallet'
      },
      result: true,
      errormsg: null,
      statuscode: 0
    };
    const resultingState = {
      ...initialState,
      templateInfo: {
        ProviderType: 'BitcoinRpc',
        Template: '{}',
        ProcessInfo: '',
        UseGetDepositWorkflow: true,
        DepositWorkflow: 'CryptoWallet'
      },
      template: {}
    };
    const newState = reducer(
      undefined,
      actions.receiveDepositTemplate(template)
    );

    expect(newState).toEqual(resultingState);
  });

  it(`Sould handle ${actions.RECEIVE_DEPOSIT_TEMPLATE_ERROR} action`, () => {
    const error = 'Account provider 0 not found';
    const resultingState = {
      ...initialState,
      error
    };
    const newState = reducer(undefined, actions.depositTemplateError(error));

    expect(newState).toEqual(resultingState);
  });

  it(`Sould handle ${actions.RECEIVE_DEPOSIT_INFO} action`, () => {
    const depositInfo = {
      AssetManagerId: 1,
      AccountId: 41,
      AssetId: 1,
      ProviderId: 1,
      DepositInfo:
        '["mk4drHrC8L164hWJm1A58prziEgyMq77gk","mxH2sAC5i8HFSFVGQC3GY32jEitQq6WaWT","n1dMaGVnJnM7Xj2C3cwCGX5s6pmnzdJGhU","mypBT7qZxUiXHxxYuBJsphv21GAu2cPFas","msLEQAC8x59BD7h9a1zy2Qvgpi6547oRBP","mgikm6GLseS9mSdvQTroQwDmbtXbevkZJA","muoVuZYv86SWUGgrPKhvpbukRwKvYCmsqE","mmzmNN1LHv6QNnffSHouAMjQQxksz9WZcw","n2kCwnB2UyqmbDCSXQVE3M29WtCaftnngJ","myhmetsAMSakcEqmkuuA7PhRVTz2LwY7Ad","mrmakW2rJ7TxngzGaXLaW4vdqrsKbqVKxz","mvxT1HeSSVUDe6mYBSevD2ekczUjh41oWE","mrQtxp44zzwqLAAXMPmhvmqX6NiTreNVp2","mu28Wsdh2PCCGwVb7KdfQQYtAvBGwhYpRd","mwuWxZmXrRjwT141JGQFbEQcaVzmJbkCPB","mqhmY7NR8D45q7yHprjSEiWMUBTnyfF2Fp","mhoYo8SwsnFm5ugVZAWfYyreN3mBQmuLrT","mjCQwTmVgHvvNXVhnqzFom82QDSo7k8GMG","n3fD5qzEHiYLvSNP7jSeZr7AwnKoaz6J6z","mzT57UuQ6wi7gwmjyF1qPSwxteDAHkwUqE","mnR3seGwRikproYRWHi5j3NyU4kvX9B7ph","mqGy9D4aNntGCHpVeJgMcYXUa9CZcFX7AP","mvLGQkby88ZPAvnhgFppKDdjWXsHSZ1qev","mmujJYCnHYMauMQPnkfxpK3UET4CZxn8Zp","mfbFAnebgAxyr9KZZkgvGoCF2DQPQUvDtb","mpBUMBz1BqRakAKY9eiPpFv9PRQTpASpji","mu4XBPXK17V8NXGAouV2e77jHLWwsUpuEK","mpE8WPqd7szXbpgTgaKSLMbfXrhtGDs1Z4","mvwAPE3KKj9SymZP8jectsnSpnppBKvFvj"]',
      result: true,
      errormsg: null,
      statuscode: 0
    };
    const resultingState = {
      ...initialState,
      depositInfo: JSON.parse(depositInfo.DepositInfo)
    };
    const newState = reducer(
      undefined,
      actions.receiveDepositInfo(JSON.parse(depositInfo.DepositInfo))
    );

    expect(newState).toEqual(resultingState);
  });

  it(`Sould handle ${actions.RECEIVE_DEPOSIT_TICKET} action`, () => {
    const depositTicket = { success: true, requestCode: 'abcd-efgh-1234-5678' };
    const resultingState = {
      ...initialState,
      depositStatus: depositTicket
    };
    const newState = reducer(
      undefined,
      actions.receiveDepositTicket(depositTicket)
    );

    expect(newState).toEqual(resultingState);
  });

  it(`Sould handle ${actions.RECEIVE_DEPOSIT_TICKETS} action`, () => {
    const depositTicket = { success: true, requestCode: 'abcd-efgh-1234-5678' };
    const resultingState = {
      ...initialState,
      depositsStatus: depositTicket
    };
    const newState = reducer(
      undefined,
      actions.receiveDepositTickets(depositTicket)
    );

    expect(newState).toEqual(resultingState);
  });

  it(`Sould handle ${CLOSE_SIDE_PANE} action`, () => {
    const resultingState = initialState;
    const newState = reducer(undefined, closeDepositSidePane());

    expect(newState).toEqual(resultingState);
  });
});
