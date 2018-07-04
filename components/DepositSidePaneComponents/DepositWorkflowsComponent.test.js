import React from 'react';
import { mount } from 'enzyme';
import CryptoWalletDepositWorkflowComponent from './DepositWorkflows/CryptoWalletDepositWorkflowComponent';
import ManualDepositWorkflowComponent from './DepositWorkflows/ManualDepositWorkflowComponent';
import DepositWorkflowsComponent from './DepositWorkflowsComponent';

jest.mock('./DepositWorkflows/CryptoWalletDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);
jest.mock('./DepositWorkflows/ManualDepositWorkflowComponent', () =>
  jest.fn().mockReturnValue(<div />)
);

describe('DepositWorkflowsComponent', () => {
  let onSubmit;
  let onSubmitResponse;

  beforeEach(() => {
    onSubmitResponse = Promise.resolve();
  });

  const buildSubject = (props = {}) => {
    onSubmit = jest.fn(() => onSubmitResponse);
    return mount(
      <DepositWorkflowsComponent
        templateInfo={{}}
        onSubmit={onSubmit}
        {...props}
      />
    );
  };

  it('should render CryptoWallet workflow if DepositWorkflow === CryptoWallet', () => {
    const subject = buildSubject({
      templateInfo: { DepositWorkflow: 'CryptoWallet' }
    });

    expect(CryptoWalletDepositWorkflowComponent).toHaveBeenCalled();
  });

  it('should render ManualDeposit workflow if DepositWorkflow === ManualDeposit', () => {
    const subject = buildSubject({
      templateInfo: { DepositWorkflow: 'ManualDeposit' }
    });

    expect(ManualDepositWorkflowComponent).toHaveBeenCalled();
  });

  it('should not render anything if there is no templateInfo', () => {
    const subject = buildSubject();

    expect(subject.children().length).toBe(0);
  });
});
