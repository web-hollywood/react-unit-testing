import {
  FETCH_PRODUCT_DEPOSIT_TEMPLATE,
  RECEIVE_DEPOSIT_TEMPLATE,
  RECEIVE_DEPOSIT_TEMPLATE_ERROR,
  RECEIVE_DEPOSIT_INFO,
  RECEIVE_DEPOSIT_TICKET,
  RECEIVE_DEPOSIT_TICKETS,
  FETCH_DEPOSIT_INFO,
  RECEIVE_DEPOSIT_INFO_ERROR,
  RESET_DEPOSIT_INFO
} from '../actions/depositActions';
import { CLOSE_SIDE_PANE } from '../actions/sidePaneActions';

const initialState = {
  templateInfo: {},
  template: {},
  error: '',
  isLoading: false,
  depositInfo: [],
  depositStatus: {},
  depositsStatus: [],
  product: 0
};

export default function deposit(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_PRODUCT_DEPOSIT_TEMPLATE:
      return {
        ...initialState,
        isLoading: true,
        product: payload.product
      };
    case FETCH_DEPOSIT_INFO:
      return {
        ...state,
        isLoading: true,
        product: payload.product
      };
    case RECEIVE_DEPOSIT_TEMPLATE: {
      return {
        ...initialState,
        product: state.product,
        templateInfo: payload.Template,
        template: JSON.parse(payload.Template.Template)
      };
    }
    case RECEIVE_DEPOSIT_TEMPLATE_ERROR:
    case RECEIVE_DEPOSIT_INFO_ERROR: {
      return {
        ...initialState,
        error: payload,
        isLoading: false
      };
    }
    case RECEIVE_DEPOSIT_INFO: {
      return {
        ...state,
        isLoading: false,
        depositInfo: payload
      };
    }
    case RECEIVE_DEPOSIT_TICKET: {
      return {
        ...state,
        depositStatus: payload
      };
    }
    case RECEIVE_DEPOSIT_TICKETS: {
      return {
        ...state,
        depositsStatus: payload
      };
    }
    case CLOSE_SIDE_PANE:
    case RESET_DEPOSIT_INFO: {
      return initialState;
    }
    default:
      return state;
  }
}
