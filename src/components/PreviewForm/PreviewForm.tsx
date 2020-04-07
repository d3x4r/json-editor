import React, { useState } from 'react';
import JsonEditor from '../JsonEditor';
import './PreviewForm.css';

type PreviewFormProps = {
  data: {};
  calculateResult: (state: {}) => void;
};

const PreviewForm: React.FC<PreviewFormProps> = (props) => {
  const { data, calculateResult } = props;
  const [previewFormState, updatePreviewForm] = useState(data);

  const havingData = Object.keys(previewFormState).length;
  // console.log(previewFormState);
  return (
    <section className="preview-form">
      <h2 className="preview-form__title">Preview</h2>
      <div className="preview-form__result">
        {havingData ? (
          <JsonEditor
            data={previewFormState}
            calculatedData={data}
            calculateResult={calculateResult}
            updatePreviewForm={updatePreviewForm}
            parent=""
          />
        ) : (
          <p className="preview-form__message">No data to render</p>
        )}
      </div>
    </section>
  );
};

export default PreviewForm;
