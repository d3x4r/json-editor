import React from 'react';
import Header from './Header';

export default {
  component: Header,
  title: 'Page header',
  decorators: [
    (story: () => React.ReactNode) => (
      <div style={{ padding: '16px 24px', backgroundColor: '#001529' }}>{story()}</div>
    ),
  ],
};

export const Default = () => <Header />;
