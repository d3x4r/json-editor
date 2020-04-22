import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { WithoutData, WithFormattedData, WithMinifiedData, testData } from './Result.stories';

it('default state without data', () => {
  const { container } = render(<WithoutData />);
  expect(container.querySelector('.result-container__text')).toHaveTextContent('{}');
  expect(container.querySelector('.ant-switch')).not.toHaveClass('ant-switch-checked');
});

it('with formatted data', () => {
  const { container } = render(<WithFormattedData />);
  const expectedFormattedData = JSON.stringify(testData, null, 4);
  expect(container.querySelector('.ant-switch')).not.toHaveClass('ant-switch-checked');
  expect(container.querySelector('.result-container__text')?.innerHTML).toEqual(
    expectedFormattedData
  );
});

it('with minified data', () => {
  const { container } = render(<WithMinifiedData />);
  const expectedMinifiedData = JSON.stringify(testData).split(' ').join('');
  expect(container.querySelector('.ant-switch')).toHaveClass('ant-switch-checked');
  expect(container.querySelector('.result-container__text')).toHaveTextContent(
    expectedMinifiedData
  );
});

it('minified data by click', () => {
  const { container } = render(<WithFormattedData />);
  const expectedMinifiedData = JSON.stringify(testData).split(' ').join('');

  fireEvent.click(container.querySelector('.ant-switch') as Element);
  expect(container.querySelector('.result-container__text')).toHaveTextContent(
    expectedMinifiedData
  );
});
