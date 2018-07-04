import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import { productsListSelector } from './../redux/selectors/depositWithdrawalSelectors';
import { depositFormSelector } from './../redux/selectors/depositSelectors';
import DepositFormComponent from './../components/DepositSidePaneComponents/DepositFormComponent';
import { closeDepositSidePane } from '../redux/actions/sidePaneActions';
import {
  fetchProductDepositTemplate,
  submitDeposit
} from './../redux/actions/depositActions';
import { showSnack } from './../redux/actions/snackbarActions';

const formName = 'createDeposit';

const mapStateToProps = state => {
  const products = productsListSelector(state);
  const { product, isDasc } = depositFormSelector(state);

  return {
    products,
    deposit: state.deposit,
    product,
    isDasc
  };
};

const mapDispatchToProps = dispatch => ({
  closeSidePane: () => dispatch(closeDepositSidePane()),
  selectDepositProduct: productId =>
    dispatch(fetchProductDepositTemplate(productId)),
  showSnack: text =>
    dispatch(showSnack({ id: 'depositCopyAddress', text, type: 'success' })),
  changeFieldValue: (field, value) => dispatch(change(formName, field, value))
});

const DepositFormContainer = connect(mapStateToProps, mapDispatchToProps)(
  DepositFormComponent
);

export default reduxForm({
  form: formName,
  onSubmit: (payload, dispatch) => dispatch(submitDeposit(payload))
})(DepositFormContainer);
