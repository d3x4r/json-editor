import React, { useState } from 'react';
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

  const getUpdatedData = (target: {}) => {
    return parent ? get(target, parent) : target;
  };

  const onAddHandler = () => {
    const propertyId = uniqueId();
    const newKeyName = `new key ${propertyId}`;
    const newValue = `new value ${propertyId}`;
    const newKeyPath = [...parent.split('.'), newKeyName];
    const dataWithAddedProperty = R.assocPath(
      newKeyPath.filter((key) => key),
      newValue,
      calculatedData
    );
    calculateResult(dataWithAddedProperty);
    updatePreviewForm(dataWithAddedProperty);
    updateObjectToRender(getUpdatedData(dataWithAddedProperty));
  };

  const getParentPath = (parent: string, key: string) =>
    parent ? `${parent}.${key}` : key;

  const result = Object.keys(objectToRender).map((key) => {
    const parentPath = getParentPath(parent, key);

    return (
      <PreviewRow
        name={key}
        value={objectToRender[key]}
        calculatedData={calculatedData}
        calculateResult={calculateResult}
        updatePreviewForm={updatePreviewForm}
        parent={parentPath}
        key={parentPath}
      />
    );
  });
  const parentsDeep = parent.split('.').length;
  // reset 5px margin to nested containers
  const marginValue = parent.split('.').length > 1 ? -5 * parentsDeep : 0;
  return (
    <div style={{ marginBottom: `${marginValue}px` }}>
      {result}
      <AddPropertyBtn onClick={onAddHandler} />
    </div>
  );
};

export default JsonEditor;
