import React, { useState } from 'react';
import Alert from './Alert';
import AlertContext, { alertTypes, AlertContextI } from '../../context/alertContext';
import { initialStateInterface } from '../../context/AlertState';
import { Button } from 'antd';
import { action } from '@storybook/addon-actions';

// import addons, { mockChannel } from '@storybook/addons';

// addons.setChannel(mockChannel());
// console.log(addons);
// if (addons)
// if (!addons.getChannel()) {
//   // Provide a mock channel to prevent "Accessing nonexistent addons channel"
//   // errors from storybook when running with Happo.
//   addons.setChannel(mockChannel());
// }

export default {
  component: Alert,
  title: 'Alert',
};

const initialState: AlertContextI = {
  message: 'custom message',
  type: 'error',
  visible: true,
  closable: false,
  setVisible: () => {},
};

const withContext = (type: alertTypes) => {
  return (
    <AlertContext.Provider value={{ ...initialState, type }}>
      <Alert />
    </AlertContext.Provider>
  );
};

export const Error = () => withContext('error');

export const Info = () => withContext('info');

export const Warning = () => withContext('warning');

export const Success = () => withContext('success');

export const WithFunctionality = () => {
  const initialState: initialStateInterface = {
    message: 'alert text',
    type: 'error',
    visible: false,
  };

  const [state, setState] = useState(initialState);
  const setVisible = (newType: alertTypes, newMessage: string, state: boolean) => {
    setState({ message: newMessage, type: newType, visible: state });
  };

  const onClickHandler = (type: alertTypes) => () => {
    action('show alert')();
    setVisible(type, 'alert text', true);
  };

  return (
    <AlertContext.Provider value={{ ...state, closable: true, setVisible }}>
      <Button data-testid="errorButton" onClick={onClickHandler('error')}>
        Error
      </Button>
      <Button onClick={onClickHandler('info')}>Info</Button>
      <Button onClick={onClickHandler('warning')}>Warning</Button>
      <Button onClick={onClickHandler('success')}>Success</Button>
      <Alert />
    </AlertContext.Provider>
  );
};
