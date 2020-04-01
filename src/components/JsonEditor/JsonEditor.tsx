import React from 'react';
import PreviewRow from '../PreviewRow';

interface JsonEditorProps {
  data: { [key: string]: any };
  calculatedData: {};
  parent: string;
  calculateResult: (state: {}) => void;
  updatePreviewForm: (state: {}) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const {
    data,
    calculateResult,
    calculatedData,
    updatePreviewForm,
    parent
  } = props;
  const result = Object.keys(data).map((key) => {
    const parentPath = parent ? `${parent}.${key}` : key;
    return (
      <PreviewRow
        name={key}
        value={data[key]}
        calculatedData={calculatedData}
        calculateResult={calculateResult}
        updatePreviewForm={updatePreviewForm}
        parent={parentPath}
        key={parentPath}
      />
    );
  });

  return <div>{result}</div>;
};

export default JsonEditor;
