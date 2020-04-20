import React from 'react';
import AddPropMenu from './AddPropMenu';
import { Disabled, Default } from './AddPropMenu.stories';
import { render, fireEvent } from '@testing-library/react';

it('default button state', () => {
  const { getByTestId } = render(<Default />);
  expect(getByTestId('addProp-button')).toBeEnabled();
  expect(getByTestId('addProp-button')).not.toHaveClass('ant-dropdown-open');
});

it('open submenu after click', () => {
  const { getByTestId } = render(<Default />);
  fireEvent.click(getByTestId('addProp-button'));
  expect(getByTestId('addProp-button')).toHaveClass('ant-dropdown-open');
  expect(getByTestId('addProp-button__submenu')).toBeInTheDocument();
});

it('select type node by click', () => {
  const onClickMock = jest.fn();
  const { getByTestId, getByText } = render(<AddPropMenu onAddHandler={onClickMock} />);
  fireEvent.click(getByTestId('addProp-button'));
  fireEvent.click(getByText('node'));
  expect(onClickMock).toBeCalledTimes(1);
});

it('select type leaf by click', () => {
  const onClickMock = jest.fn();
  const { getByTestId, getByText } = render(<AddPropMenu onAddHandler={onClickMock} />);
  fireEvent.click(getByTestId('addProp-button'));
  fireEvent.click(getByText('leaf'));
  expect(onClickMock).toBeCalledTimes(1);
});

it('disabling by props', () => {
  const { getByText } = render(<Disabled />);
  expect(getByText('', { selector: 'button' })).toBeDisabled();
});
