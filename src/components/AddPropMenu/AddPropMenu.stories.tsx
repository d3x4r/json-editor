import React from 'react';
import { action } from '@storybook/addon-actions';
import AddPropMenu from './AddPropMenu';

export default {
  component: AddPropMenu,
  title: 'Button to add property',
  excludeStories: 'props',
};

const props = {
  onAddHandler: action('Click'),
  disabled: false,
};

export const Default = () => <AddPropMenu {...props} />;

export const Disabled = () => <AddPropMenu {...{ ...props, ...{ disabled: true } }} />;
