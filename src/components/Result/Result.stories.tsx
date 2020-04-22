import React from 'react';
import Result from './Result';

export default {
  component: Result,
  title: 'Result data',
  excludeStories: ['testData'],
};

export const testData = {
  id: '0001',
  type: 'donut',
  name: 'Cake',
  image: {
    url: 'images/0001.jpg',
    width: 200,
    height: 200,
  },
  thumbnail: {
    url: 'images/thumbnails/0001.jpg',
    width: 32,
    height: 32,
  },
};

export const WithoutData = () => <Result data={{}} />;

export const WithFormattedData = () => <Result data={testData} />;

export const WithMinifiedData = () => <Result data={testData} isMinified={true} />;
