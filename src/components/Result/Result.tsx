import React, { useState } from 'react';
import { Switch } from 'antd';
import './Result.css';

interface ResultProps {
  data: {};
}
const Result: React.FC<ResultProps> = ({ data }) => {
  const [minify, setMinify] = useState(false);

  const result = JSON.stringify(data, null, 4);
  return (
    <section className="preview-form">
      <div className="preview-form__header">
        <h2 className="preview-form__title">Result</h2>
        <div>
          <span>Minify: </span>
          <Switch onChange={() => setMinify(!minify)} />
        </div>
      </div>
      <div className="result-container" data-testid="result-container">
        {minify ? <p>{result}</p> : <pre>{result}</pre>}
      </div>
    </section>
  );
};

export default Result;
