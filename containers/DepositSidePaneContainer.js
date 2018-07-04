import { connect } from 'react-redux';
import DepositSidePaneComponent from '../components/DepositSidePaneComponents/DepositSidePaneComponent';
import sidePaneDecorator from '../hocs/sidePaneDecorator';
import { SIDE_PANES } from '../constants/sidePanesConstants';

const mapStateToProps = state => {
  const { sidePane } = state;

  return {
    isOpen: sidePane[SIDE_PANES.DEPOSITS]
  };
};

const DepositSidePaneContainer = connect(mapStateToProps)(
  DepositSidePaneComponent
);

export default sidePaneDecorator({ sidePaneName: SIDE_PANES.DEPOSITS })(
  DepositSidePaneContainer
);
