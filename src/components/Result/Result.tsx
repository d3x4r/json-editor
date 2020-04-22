import React, { useState } from 'react';
import { Switch } from 'antd';
import './Result.css';

interface ResultProps {
  data: {};
  isMinified?: boolean;
}
const Result: React.FC<ResultProps> = ({ data, isMinified = false }) => {
  const [minify, setMinify] = useState(isMinified);

  return (
    <section className="preview-form">
      <div className="preview-form__header">
        <h2 className="preview-form__title">Result</h2>
        <div>
          <span>Minify: </span>
          <Switch onChange={() => setMinify(!minify)} defaultChecked={isMinified} />
        </div>
      </div>
      <div className="result-container" data-testid="result-container">
        {minify ? (
          <p className="result-container__text">{JSON.stringify(data).split(' ').join('')}</p>
        ) : (
          <pre className="result-container__text">{JSON.stringify(data, null, 4)}</pre>
        )}
      </div>
    </section>
  );
};

export default Result;
