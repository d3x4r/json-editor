import React from 'react';
import RemoveButton from './RemoveButton';
import { render, fireEvent } from '@testing-library/react';

it('fire on click', () => {
  const onPropRemove = jest.fn();
  const { getByTestId } = render(<RemoveButton onRemove={onPropRemove} />);
  fireEvent.click(getByTestId('removeProp-button'));
  expect(onPropRemove).toBeCalled();
});

it('fire on click', () => {
  const { getByTestId } = render(<RemoveButton onRemove={() => {}} disabled />);
  expect(getByTestId('removeProp-button')).toBeDisabled();
});
