import React from "react";
import JsonEditor from "../JsonEditor";
import "./PreviewForm.css";

type PreviewFormProps = {
  data: {};
  calculateResult: (state: any) => void;
};

const PreviewForm: React.FC<PreviewFormProps> = props => {
  const { data, calculateResult } = props;
  return (
    <section className="preview-form">
      <h2 className="preview-form__title">Preview</h2>
      <div className="preview-form__result">
        {Object.keys(data).length ? (
          <JsonEditor data={data} onChangeHandler={calculateResult} parent="" />
        ) : (
          <p className="preview-form__message">No data to render</p>
        )}
      </div>
    </section>
  );
};

export default PreviewForm;
