import React from 'react';
import { Error, Info, Success, Warning, WithFunctionality } from './Alert.stories';
import { render, fireEvent, wait } from '@testing-library/react';
import { alertTypes } from '../../context/alertContext';

import addons, { mockChannel } from '@storybook/addons';

addons.setChannel(mockChannel());

const testByType = (AlertComponent: React.ReactElement, typeText: alertTypes) => {
  if (!typeText) {
    return;
  }
  const { container, unmount } = render(AlertComponent);
  const alertTypeContainer = container.querySelector('.ant-alert-message');
  expect(alertTypeContainer).toHaveTextContent(typeText.toUpperCase());
  unmount();
};

it('correct type message after rendering', () => {
  testByType(<Error />, 'error');
  testByType(<Info />, 'info');
  testByType(<Success />, 'success');
  testByType(<Warning />, 'warning');
});

it('open and close alert', async () => {
  const { queryByTestId, getByTestId, getByText } = render(<WithFunctionality />);
  expect(queryByTestId('alert')).not.toBeInTheDocument();
  fireEvent.click(getByTestId('errorButton'));
  expect(queryByTestId('alert')).toBeInTheDocument();
  fireEvent.click(getByText('', { selector: '.ant-alert-close-icon' }));
  await wait(() => {
    expect(queryByTestId('alert')).not.toBeInTheDocument();
  });
});
