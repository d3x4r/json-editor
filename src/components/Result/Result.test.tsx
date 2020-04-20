import React from 'react';
import { render } from '@testing-library/react';
import Result from './Result';
import '@testing-library/jest-dom/extend-expect';

it('Test render data', () => {
  const { getByTestId } = render(<Result data={{ data: 'processed user data' }} />);
  const resultContainer = getByTestId('result-container');
  expect(resultContainer).toHaveTextContent('processed user data');
});
