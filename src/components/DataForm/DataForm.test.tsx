import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DataForm from './DataForm';
import '@testing-library/jest-dom/extend-expect';
import definePropertyMatchMedia from './matchMedia.mock';

definePropertyMatchMedia();

it('Test form data initial state', () => {
  const { getByTestId } = render(<DataForm updateEditorData={() => {}} />);
  const submitButton = getByTestId('form-data-submit');
  const textArea = getByTestId('data-form-textarea');
  // disabled as default
  expect(submitButton).toBeDisabled();
  // havent value as default
  expect(textArea).toHaveTextContent('');
});

it('Test change input state', () => {
  const { getByTestId } = render(<DataForm updateEditorData={() => {}} />);
  const textArea = getByTestId('data-form-textarea');

  fireEvent.change(textArea, { target: { value: 'users input data' } });
  expect(textArea).toHaveTextContent('users input data');
});

it('Test disabled submit after clear data', () => {
  const { getByTestId } = render(<DataForm updateEditorData={() => {}} />);
  const submitButton = getByTestId('form-data-submit');
  const textArea = getByTestId('data-form-textarea');

  fireEvent.change(textArea, { target: { value: 'users input data' } });
  expect(textArea).toHaveTextContent('users input data');
  fireEvent.change(textArea, { target: { value: '' } });
  expect(submitButton).toBeDisabled();
});
