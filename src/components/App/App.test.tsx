import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import definePropertyMatchMedia from './matchMedia.mock';

definePropertyMatchMedia();

it('Test app render', () => {
  const result = render(<App />);
  expect(result).toMatchSnapshot();
});
