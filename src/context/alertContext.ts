import { createContext } from 'react';

export type alertTypes = 'error' | 'success' | 'info' | 'warning' | undefined;

interface AlertContextI {
  message: string;
  type: alertTypes;
  visible: boolean;
  setVisible: (newType: alertTypes, newMessage: string, state: boolean) => void;
}

const alertContext = createContext({} as AlertContextI);

export default alertContext;
