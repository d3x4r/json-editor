import React from 'react';
import { action } from '@storybook/addon-actions';
import AddPropertyBtn from './AddPropertyBrn';

export default {
  component: AddPropertyBtn,
  title: 'Button to add leaf',
};

export const Default = () => <AddPropertyBtn onClick={action('Click event')} />;
