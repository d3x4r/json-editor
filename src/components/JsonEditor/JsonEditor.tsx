import React, { useState, useEffect } from 'react';
import PreviewRow from '../PreviewRow';
import AddPropertyBtn from '../AddPropertyBtn';
import * as R from 'ramda';
import uniqueId from 'lodash.uniqueid';
import get from 'lodash.get';

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
    parent,
  } = props;

  const [objectToRender, updateObjectToRender] = useState(data);
  const [testPar, setTestPar] = useState(parent);

  const getUpdatedData = (target: {}) => {
    return parent ? get(target, parent) : target;
  };

  const onAddHandler = () => {
    console.log(parent);
    const propertyId = uniqueId();
    const newKeyName = `newKey_${propertyId}`;
    const newValue = `newValue_${propertyId}`;
    const newKeyPath = [...parent.split('.'), newKeyName];
    const dataWithAddedProperty = R.assocPath(
      newKeyPath.filter((key) => key),
      newValue,
      calculatedData
    );

    calculateResult((state: {}) => {
      return R.assocPath(
        newKeyPath.filter((key) => key),
        newValue,
        state
      );
    });
    updatePreviewForm((state: {}) => {
      return R.assocPath(
        newKeyPath.filter((key) => key),
        newValue,
        state
      );
    });
    updateObjectToRender(getUpdatedData(dataWithAddedProperty));
  };

  const result = Object.keys(objectToRender).map((key) => {
    return (
      <PreviewRow
        name={key}
        value={objectToRender[key]}
        calculatedData={calculatedData}
        calculateResult={calculateResult}
        updatePreviewForm={updatePreviewForm}
        parent={parent}
        key={key}
        setTestPar={setTestPar}
      />
    );
  });
  // temp reset 5px margin to nested containers
  const parentsDeep = parent.split('.').length;
  const marginValue = parent.split('.').length > 1 ? -5 * parentsDeep : 0;
  return (
    <div style={{ marginBottom: `${marginValue}px` }}>
      {result}
      <AddPropertyBtn onClick={onAddHandler} />
    </div>
  );
};

export default JsonEditor;
