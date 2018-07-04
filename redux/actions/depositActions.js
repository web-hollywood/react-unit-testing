import apex from '../../apex';

import { showSnack } from './snackbarActions';
import { closeDepositSidePane } from './sidePaneActions';
import { formatErrorText } from '../../helpers/errorTextFormatter';

export const FETCH_PRODUCT_DEPOSIT_TEMPLATE = 'FETCH_PRODUCT_DEPOSIT_TEMPLATE';
export const RECEIVE_DEPOSIT_TEMPLATE = 'RECEIVE_DEPOSIT_TEMPLATE';
export const RECEIVE_DEPOSIT_TEMPLATE_ERROR = 'RECEIVE_DEPOSIT_TEMPLATE_ERROR';
export const RECEIVE_DEPOSIT_INFO_ERROR = 'RECEIVE_DEPOSIT_INFO_ERROR';
export const SUBMITTING_DEPOSIT = 'SUBMITTING_DEPOSIT';
export const FETCH_DEPOSIT_INFO = 'FETCH_DEPOSIT_INFO';
export const RECEIVE_DEPOSIT_INFO = 'RECEIVE_DEPOSIT_INFO';
export const RECEIVE_DEPOSIT_TICKET = 'RECEIVE_DEPOSIT_TICKET';
export const RECEIVE_DEPOSIT_TICKETS = 'RECEIVE_DEPOSIT_TICKETS';
export const RESET_DEPOSIT_INFO = 'RESET_DEPOSIT_INFO';

export const fetchProductDepositTemplate = ProductId => async (
  dispatch,
  getState
) => {
  if (isNaN(ProductId)) {
    return dispatch({ type: RESET_DEPOSIT_INFO });
  }

  dispatch(fetchingDepositTemplate(ProductId));
  const payload = {
    ProductId,
    OMSId: getState().user.userInfo.OMSId,
    AccountId: getState().user.selectedAccountId
  };
  const data = await apex.connection.GetDepositRequestInfoTemplate(payload);

  if (data.result) {
    const { UseGetDepositWorkflow, Template } = data.Template;

    if (Template === '{}' && UseGetDepositWorkflow) {
      dispatch(getDepositInfo(ProductId));
    }

    return dispatch(receiveDepositTemplate(data));
  }

  return dispatch(depositTemplateError(data.errormsg));
};

export const getDepositInfo = ProductId => async (dispatch, getState) => {
  const { OMSId } = getState().user.userInfo;
  const AccountId = getState().user.selectedAccountId;
  const payload = {
    OMSId,
    AccountId,
    ProductId: +ProductId,
    GenerateNewKey: true
  };

  dispatch(fetchingDepositInfo(ProductId));

  const depositInfo = await apex.connection.GetDepositInfo(payload);
  if (depositInfo.result) {
    return dispatch(receiveDepositInfo(JSON.parse(depositInfo.DepositInfo)));
  }
  return dispatch(depositInfoError(depositInfo.errormsg));
};

export const getDepositTickets = () => async (dispatch, getState) => {
  const { OMSId } = getState().user.userInfo;
  const AccountId = getState().user.selectedAccountId;
  const depositTickets = await apex.connection.GetDepositTickets({
    OMSId,
    AccountId,
    OperatorId: 1
  });

  return dispatch(receiveDepositTickets(depositTickets));
};

export const createDepositTicket = ({ ProductId, amount, ...info }) => async (
  dispatch,
  getState
) => {
  const { OMSId } = getState().user.userInfo;
  const AccountId = getState().user.selectedAccountId;
  const payload = {
    OMSId,
    OperatorId: 1,
    AccountId,
    RequestUser: AccountId,
    AssetId: +ProductId,
    Amount: +amount,
    DepositInfo: JSON.stringify(info),
    Status: 'New'
  };
  const depositStatus = await apex.connection.CreateDepositTicket(payload);

  if (depositStatus.result === false) {
    return dispatch(
      showSnack({
        id: 'depositRejectSnack',
        text: formatErrorText(depositStatus),
        type: 'warning'
      })
    );
  }
  dispatch(closeDepositSidePane());
  // context.t('Your deposit has been successfully added')
  dispatch(
    showSnack({
      id: 'depositSuccessSnack',
      text: 'Your deposit has been successfully added',
      type: 'success'
    })
  );
  return dispatch(receiveDepositTicket(depositStatus));
};

export const submitDeposit = payload => dispatch => {
  dispatch(submittingDeposit);

  return dispatch(createDepositTicket(payload));
};

export const fetchingDepositTemplate = product => ({
  type: FETCH_PRODUCT_DEPOSIT_TEMPLATE,
  payload: { product }
});

export const fetchingDepositInfo = product => ({
  type: FETCH_DEPOSIT_INFO,
  payload: { product }
});
export const receiveDepositTemplate = payload => ({
  type: RECEIVE_DEPOSIT_TEMPLATE,
  payload
});
export const depositTemplateError = payload => ({
  type: RECEIVE_DEPOSIT_TEMPLATE_ERROR,
  payload
});
export const depositInfoError = payload => ({
  type: RECEIVE_DEPOSIT_INFO_ERROR,
  payload
});
export const submittingDeposit = { type: SUBMITTING_DEPOSIT };
export const receiveDepositInfo = payload => ({
  type: RECEIVE_DEPOSIT_INFO,
  payload
});
export const receiveDepositTicket = payload => ({
  type: RECEIVE_DEPOSIT_TICKET,
  payload
});

export const receiveDepositTickets = payload => ({
  type: RECEIVE_DEPOSIT_TICKETS,
  payload
});
