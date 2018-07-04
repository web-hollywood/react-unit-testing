import React from 'react';
import { mount } from 'enzyme';
import DepositTemplateFormComponent from './DepositTemplateFormComponent';
import { templateFormRenderer } from '../../helpers/formTemplateHelper';

jest.mock('../../helpers/formTemplateHelper', () => ({
  templateFormRenderer: jest.fn(template =>
    Object.keys(template).map(field => <div key={field}>{field}</div>)
  )
}));

describe('DepositTemplateFormComponent', () => {
  const buildSubject = (props = {}) => {
    const subject = (
      <DepositTemplateFormComponent
        template={{}}
        submitting={false}
        {...props}
      />
    );

    return mount(subject, { context: { t: v => v } });
  };

  it('should return an empty div if template is empty', () => {
    const subject = buildSubject();

    expect(subject.html()).toEqual('<div></div>');
  });

  it('should call TemplateFormRender when template object has values', () => {
    const subject = buildSubject({ template: { amount: 0, name: '' } });

    expect(templateFormRenderer).toHaveBeenCalled();
  });

  it('should render a button when template object has values', () => {
    const subject = buildSubject({ template: { amount: 0, name: '' } });

    expect(subject.find('button').length).toBe(1);
  });

  it('should render a button with Submit text when submitting prop is false', () => {
    const subject = buildSubject({ template: { amount: 0, name: '' } });

    expect(subject.find('button').text()).toBe('SUBMIT');
  });

  it('should render a button with Submitting... text when submitting prop is true', () => {
    const subject = buildSubject({
      template: { amount: 0, name: '' },
      submitting: true
    });

    expect(subject.find('button').text()).toBe('Submitting...');
  });
});
