import React from 'react';
import RemoveButton from './RemoveButton';
import { action } from '@storybook/addon-actions';

export default {
  component: RemoveButton,
  title: 'Button To Remove property',
};

export const Default = () => <RemoveButton onRemove={action('click')} />;

export const Disabled = () => <RemoveButton onRemove={action('click')} disabled />;
