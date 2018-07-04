import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import DepositSidePaneContainer from './DepositSidePaneContainer';
import DepositSidePaneComponent from '../components/DepositSidePaneComponents/DepositSidePaneComponent';
import { closeDepositSidePane } from '../redux/actions/sidePaneActions';
import { SIDE_PANES } from '../constants/sidePanesConstants';

jest.mock(
  '../components/DepositSidePaneComponents/DepositSidePaneComponent',
  () => jest.fn().mockReturnValue(<div />)
);

describe('DepositSidePaneContainer', () => {
  const initialState = {
    sidePane: {
      [SIDE_PANES.DEPOSITS]: false
    }
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore(initialState);
    container = mount(<DepositSidePaneContainer store={store} />);
  });

  it('should render DepositSidePaneComponent component', () => {
    expect(DepositSidePaneComponent).toHaveBeenCalled();
  });

  it('should pass isOpen state for deposit side pane', () => {
    expect(container.childAt(0).prop('isOpen')).toEqual(
      initialState.sidePane[SIDE_PANES.DEPOSITS]
    );
  });
});
