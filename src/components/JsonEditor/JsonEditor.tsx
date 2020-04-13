import React from 'react';
import PreviewRow from '../PreviewRow';
import { typesOfNodes } from '../../types';
import './JsonEditor.css';

interface JsonEditorProps {
  data: { [key: string]: any };
  calculatedData: {};
  parent: string;
  calculateResult: (state: {}) => void;
  updatePreviewForm: (state: {}) => void;
  onAddProperty: (parent: string) => (nodeType: typesOfNodes) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const { data, calculateResult, calculatedData, updatePreviewForm, parent, onAddProperty } = props;

  const result = Object.keys(data).map((key) => {
    return (
      <PreviewRow
        name={key}
        value={data[key]}
        calculatedData={calculatedData}
        calculateResult={calculateResult}
        updatePreviewForm={updatePreviewForm}
        parent={parent}
        key={key}
        onAddHandler={onAddProperty}
      />
    );
  });

  return <div className="json-editor">{result}</div>;
};

export default JsonEditor;
