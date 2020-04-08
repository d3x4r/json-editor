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

interface newObject {
  name: string;
  value: string;
}

const getUpdatedData = (state: {}, target: string) => {
  return target ? get(state, target) : state;
};

const getStateWithAddedProperty = (path: string[], value: string) => (state: {}) => {
  return R.assocPath(
    path.filter((key) => key),
    value,
    state
  );
};

const getNewObject = (): newObject => {
  const objectId = uniqueId();
  const name = `newKey_${objectId}`;
  const value = `newValue_${objectId}`;
  return { name, value };
};

const getAddedKeyPath = (parent: string, addedKey: string) => [...parent.split('.'), addedKey];

const JsonEditor: React.FC<JsonEditorProps> = (props) => {
  const { data, calculateResult, calculatedData, updatePreviewForm, parent } = props;

  const [dataToRender, updateDataToRender] = useState(data);

  const onAddHandler = () => {
    const { name, value } = getNewObject();
    const addedKeyPath = getAddedKeyPath(parent, name);
    const getUpdatedState = getStateWithAddedProperty(addedKeyPath, value);
    const calculatedDataWithAddedProperty = getUpdatedState(calculatedData);
    const updatedDataToRender = getUpdatedData(calculatedDataWithAddedProperty, parent);

    calculateResult(calculatedDataWithAddedProperty);
    updatePreviewForm((state: {}) => getUpdatedState(state));
    updateDataToRender(updatedDataToRender);
  };

  const result = Object.keys(dataToRender).map((key) => {
    return (
      <PreviewRow
        name={key}
        value={dataToRender[key]}
        calculatedData={calculatedData}
        calculateResult={calculateResult}
        updatePreviewForm={updatePreviewForm}
        parent={parent}
        key={key}
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
