import { createContext } from 'react';

export type alertTypes = 'error' | 'success' | 'info' | 'warning' | undefined;

export interface AlertContextI {
  message: string;
  type: alertTypes;
  visible: boolean;
  setVisible: (newType: alertTypes, newMessage: string, state: boolean) => void;
  closable?: boolean;
}

const alertContext = createContext({} as AlertContextI);

export default alertContext;
