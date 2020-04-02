import React from 'react';
import './Result.css';

interface ResultProps {
  data: {};
}
const Result: React.FC<ResultProps> = ({ data }) => (
  <section className="preview-form">
    <h2 className="preview-form__title">Result</h2>
    <pre>{JSON.stringify(data, null, 4)}</pre>
  </section>
);

export default Result;
