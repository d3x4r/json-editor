import React, { useState } from 'react';
import JsonEditor from '../JsonEditor';
import * as R from 'ramda';
import get from 'lodash.get';
import ValueTypeChanger from '../ValueTypeChanger';
import './PreviewRow.css';
import { Input } from 'antd';
import RemoveButton from '../RemoveButton';
import { isObject, getValueType, convertValueType } from '../../utils';
import { typesToConvert } from '../../types';

interface PreviewRowProps {
  name: string;
  value: any;
  calculatedData: {};
  parent: string;
  calculateResult: (state: {}) => void;
  updatePreviewForm: (state: {}) => void;
}

const getPathOfProperty = (parentPath: string, property: string) =>
  parentPath ? `${parentPath}.${property}` : property;

const getArrayOfPathParts = (path: string, propertyName: string = ''): Array<string> => {
  return [...path.split('.'), propertyName].filter((key) => key);
};

const getUpdatedState = (
  addedPathOfValue: Array<string>,
  addedValue: any,
  oldPathOfValue: Array<string>
) => (state: {}) => {
  const stateWithNewKey = R.assocPath(addedPathOfValue, addedValue, state);
  return R.dissocPath(oldPathOfValue, stateWithNewKey);
};

const getStateWithRemovedKey = (path: Array<string>) => (state: {}) => R.dissocPath(path, state);

const PreviewRow: React.FC<PreviewRowProps> = (props) => {
  const {
    name,
    value: objValue,
    calculatedData,
    calculateResult,
    updatePreviewForm,
    parent,
  } = props;

  const [objKeyInput, setObjKeyInput] = useState(name);
  const [savedPropValue, savePropValue] = useState(objValue);
  const [objValueInput, setObjValueInput] = useState(objValue);
  const [valueType, setValueType] = useState(getValueType(objValueInput));
  const [isRenderedRow, setRenderedKey] = useState(true);

  const changeObjectPropertyType = (valueType: typesToConvert) => {
    setValueType(valueType);
    const propertyPathParts = getArrayOfPathParts(parent, objKeyInput);
    const convertedValue = convertValueType(objValueInput, valueType);

    calculateResult((state: {}) => R.assocPath(propertyPathParts, convertedValue, state));
  };

  const onChangeKey = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = evt;

    const currentKeyPath = getPathOfProperty(parent, value);
    const prevInputPath = getPathOfProperty(parent, objKeyInput);
    const propertyValue = get(calculatedData, prevInputPath);
    const arrayOfCurrentInputParents = getArrayOfPathParts(currentKeyPath);
    const arrayOfPrevInputParents = getArrayOfPathParts(prevInputPath);

    const updateState = getUpdatedState(
      arrayOfCurrentInputParents,
      propertyValue,
      arrayOfPrevInputParents
    );

    calculateResult(updateState);
    updatePreviewForm(updateState);
    savePropValue(propertyValue);
    setObjKeyInput(value);
  };

  const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = evt;

    const convertedValue = convertValueType(value, valueType as typesToConvert);
    const arrayOfPropertyPaths = getArrayOfPathParts(parent, objKeyInput);

    calculateResult((state: {}) => R.assocPath(arrayOfPropertyPaths, convertedValue, state));
    setObjValueInput(value);
  };

  const onPropRemove = (parent: string, name: string) => () => {
    const arrayOfPropertyPaths = getArrayOfPathParts(parent, name);
    const removeProp = getStateWithRemovedKey(arrayOfPropertyPaths);

    calculateResult(removeProp);
    updatePreviewForm(removeProp);
    setRenderedKey(false);
  };

  const typeChanger = (
    <ValueTypeChanger
      defaultType={valueType as typesToConvert}
      setType={changeObjectPropertyType}
    />
  );

  const renderKey = () => (
    <>
      <Input
        className="previewRow__key"
        value={objKeyInput}
        onChange={onChangeKey}
        style={{ width: 120 }}
      />
      <RemoveButton onRemove={onPropRemove(parent, objKeyInput)} />
      <span className="previewRow__splitter">:</span>
    </>
  );

  const renderProperty = () => (
    <>
      {isObject(savedPropValue) ? (
        <JsonEditor
          data={savedPropValue}
          calculateResult={calculateResult}
          calculatedData={calculatedData}
          updatePreviewForm={updatePreviewForm}
          parent={getPathOfProperty(parent, objKeyInput)}
        />
      ) : (
        <Input
          value={objValueInput}
          onChange={onChangeValue}
          style={{ width: 220 }}
          addonAfter={typeChanger}
        />
      )}
    </>
  );

  const renderRow = () => (
    <div className="previewRow">
      {renderKey()}
      {renderProperty()}
    </div>
  );

  return isRenderedRow ? renderRow() : null;
};

export default PreviewRow;
