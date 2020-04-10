import React from 'react';
import JsonEditor from '../JsonEditor';
import './PreviewForm.css';

type PreviewFormProps = {
  data: {};
  calculateResult: (state: {}) => void;
  updateEditorState: (state: {}) => void;
  dataToRender: {};
};

const PreviewForm: React.FC<PreviewFormProps> = (props) => {
  const { data, calculateResult, updateEditorState, dataToRender } = props;

  const havingData = Object.keys(data).length;

  return (
    <section className="preview-form">
      <h2 className="preview-form__title">Preview</h2>
      <div className="preview-form__result">
        {havingData ? (
          <JsonEditor
            data={data}
            calculatedData={dataToRender}
            calculateResult={calculateResult}
            updatePreviewForm={updateEditorState}
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
