import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('Test app render', () => {
  const result = render(<App />);
  expect(result).toMatchSnapshot();
});
