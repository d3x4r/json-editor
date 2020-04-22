import React from 'react';
import DataForm from './DataForm';
import { action } from '@storybook/addon-actions';
import alertContext, { AlertContextI } from '../../context/alertContext';
import AlertState from '../../context/AlertState';
import Alert from '../Alert';

export default {
  component: DataForm,
  title: 'Textarea form',
};

export const Default = () => {
  const initialAlertState: AlertContextI = {
    message: '',
    type: undefined,
    visible: false,
    setVisible: action('Show Error message'),
  };

  return (
    <alertContext.Provider value={initialAlertState}>
      <DataForm updateEditorData={action('Form submit')} />
    </alertContext.Provider>
  );
};

export const WithAlert = ({ onFormSubmit = action('form sumbit') }) => (
  <AlertState>
    <Alert />
    <DataForm updateEditorData={onFormSubmit} />
  </AlertState>
);
