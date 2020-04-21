import React, { useState } from 'react';
import alertContext from './alertContext';
import { alertTypes } from './alertContext';

export interface initialStateInterface {
  message: string;
  type: alertTypes;
  visible: boolean;
}

const AlertState: React.FC = ({ children }) => {
  const initialState: initialStateInterface = {
    message: '',
    type: undefined,
    visible: false,
  };

  const [message, setMessage] = useState(initialState);
  const setVisible = (newType: alertTypes, newMessage: string, state: boolean) => {
    setMessage({ message: newMessage, type: newType, visible: state });
  };

  return (
    <alertContext.Provider value={{ ...message, setVisible }}>{children}</alertContext.Provider>
  );
};

export default AlertState;
