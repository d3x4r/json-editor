import React from 'react';
import DataForm from './DataForm';
import { action } from '@storybook/addon-actions';
import alertContext, { AlertContextI } from '../../context/alertContext';

export default {
  component: DataForm,
  title: 'Input Form',
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
