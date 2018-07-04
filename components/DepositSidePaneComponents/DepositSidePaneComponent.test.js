import React from 'react';
import { mount } from 'enzyme';
import DepositSidePaneComponent from './DepositSidePaneComponent';
import DepositFormComponent from './DepositFormComponent';

jest.mock('../common/SidePane', () => ({ children }) => (
  <div className="side-pane">{children}</div>
));
jest.mock('../../containers/DepositFormContainer', () => () => (
  <div className="deposit-form-container">Content</div>
));

describe('DepositFormComponent', () => {
  const buildSubject = (props = {}) =>
    mount(
      <DepositSidePaneComponent
        isOpen={false}
        closeSidePane={() => {}}
        {...props}
      />
    );

  it('should render DepositFormContainer', () => {
    const subject = buildSubject();

    expect(subject.find('.deposit-form-container').length).toBe(1);
  });
});
