import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddPropertyBtn from './AddPropertyBrn';

it('test click on add property', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<AddPropertyBtn onClick={onClickMock} />);
  fireEvent.click(getByText('Add leaf'));
  expect(onClickMock).toBeCalled();
});
