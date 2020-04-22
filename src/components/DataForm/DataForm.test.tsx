import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Default, WithAlert } from './DataForm.stories';
import { JSONexample } from './DataForm';
import addons, { mockChannel } from '@storybook/addons';

addons.setChannel(mockChannel());

it('initial form test', () => {
  const { getByText, getByPlaceholderText } = render(<Default />);
  expect(getByPlaceholderText('enter data in json format')).toHaveValue('');
  expect(getByText('Render Preview')).toBeDisabled();
});

it('submit form test', async () => {
  const { getByTestId, getByPlaceholderText } = render(<Default />);
  fireEvent.change(getByPlaceholderText('enter data in json format'), { target: { value: '123' } });
  expect(getByPlaceholderText('enter data in json format')).toHaveValue('123');
  fireEvent.click(getByTestId('form-data-submit'));
  await wait(() => {
    // clear after submit
    expect(getByPlaceholderText('enter data in json format')).toHaveValue('');
  });
  expect(getByTestId('form-data-submit')).toBeDisabled();
});

it('example button test', async () => {
  const { getByTestId, getByPlaceholderText } = render(<Default />);
  fireEvent.click(getByTestId('form-data-example'));
  expect(getByPlaceholderText('enter data in json format')).toHaveValue(JSONexample);
  fireEvent.click(getByTestId('form-data-submit'));
  await wait(() => {
    // clear after submit
    expect(getByPlaceholderText('enter data in json format')).toHaveValue('');
  });
});

it('form callback test', async () => {
  const onFormSubmitHandler = jest.fn();
  const { getByTestId } = render(<WithAlert onFormSubmit={onFormSubmitHandler} />);
  fireEvent.click(getByTestId('form-data-example'));
  fireEvent.click(getByTestId('form-data-submit'));
  await wait(() => {
    expect(onFormSubmitHandler).toBeCalled();
  });
});

it('form error message text', async () => {
  const { getByTestId, queryByTestId, getByPlaceholderText, findByTestId, getByText } = render(
    <WithAlert />
  );
  expect(queryByTestId('alert')).not.toBeInTheDocument();
  fireEvent.change(getByPlaceholderText('enter data in json format'), {
    target: { value: 'text' },
  });
  fireEvent.click(getByTestId('form-data-submit'));
  expect(await findByTestId('alert')).toBeInTheDocument();
  fireEvent.click(getByText('', { selector: '.ant-alert-close-icon' }));
  await wait(() => {
    expect(queryByTestId('alert')).not.toBeInTheDocument();
  });
});

it('failure to send invalid form', async () => {
  const onFormSubmitHandler = jest.fn();
  const { getByTestId, getByPlaceholderText } = render(
    <WithAlert onFormSubmit={onFormSubmitHandler} />
  );
  fireEvent.change(getByPlaceholderText('enter data in json format'), {
    target: { value: 'invalid text' },
  });
  expect(getByPlaceholderText('enter data in json format')).toHaveValue('invalid text');
  fireEvent.click(getByTestId('form-data-submit'));
  await wait(() => {
    expect(onFormSubmitHandler).not.toBeCalled();
  });
});
