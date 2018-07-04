import React from 'react';
import PropTypes from 'prop-types';
import SidePane from '../common/SidePane';
import DepositFormContainer from '../../containers/DepositFormContainer';

export default class DepositSidePaneComponent extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeSidePane: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isOpen, closeSidePane } = this.props;

    return (
      <SidePane
        isOpen={isOpen}
        close={closeSidePane}
        hideCloseLink={false}
        title="Deposit"
        customClass="deposit-sidepane">
        <DepositFormContainer />
      </SidePane>
    );
  }
}
