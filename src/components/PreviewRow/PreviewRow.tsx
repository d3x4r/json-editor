import React, { useState, useEffect } from 'react';
import JsonEditor from '../JsonEditor';
import * as R from 'ramda';
import get from 'lodash.get';
import ValueTypeChanger from '../ValueTypeChanger';
import './PreviewRow.css';
import { Input } from 'antd';
import RemoveButton from '../RemoveButton';
import AddPropMenu from '../AddPropMenu';
import { isObject, getValueType, convertValueType } from '../../utils';
import { typesToConvert, typesOfNodes } from '../../types';

interface PreviewRowProps {
  name: string;
  value: any;
  calculatedData: {};
  parent: string;
  calculateResult: (state: {}) => void;
  updatePreviewForm: (state: {}) => void;
  onAddHandler: (parent: string) => (nodeType: typesOfNodes) => void;
}

const getPathOfProperty = (parentPath: string, property: string) =>
  parentPath ? `${parentPath}.${property}` : property;

const getArrayOfPathParts = (path: string, propertyName: string = ''): Array<string> => {
  return [...path.split('.'), propertyName].filter((key) => key);
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
    onAddHandler,
  } = props;

  const [objKeyInput, setObjKeyInput] = useState(name);
  const [savedPropValue, savePropValue] = useState(objValue);
  const [objValueInput, setObjValueInput] = useState(objValue);
  const [valueType, setValueType] = useState(getValueType(objValueInput));
  const [isRenderedRow, setRenderedKey] = useState(true);
  const [isInvalid, setInvalid] = useState(false);

  useEffect(() => {
    savePropValue(objValue);
    setObjValueInput(objValue);
  }, [objValue]);

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

    setObjKeyInput(value);

    const currentKeyPath = getPathOfProperty(parent, value);
    const prevInputPath = getPathOfProperty(parent, objKeyInput);
    const propertyValue = get(calculatedData, prevInputPath);
    const arrayOfCurrentInputParents = getArrayOfPathParts(currentKeyPath);
    const arrayOfPrevInputParents = getArrayOfPathParts(prevInputPath);

    const alreadyAddedToResult = get(calculatedData, currentKeyPath);

    if (value.length === 0 || alreadyAddedToResult) {
      setInvalid(true);
      calculateResult((state: {}) => R.dissocPath(arrayOfPrevInputParents, state));
      savePropValue(propertyValue);
    } else if (!isInvalid) {
      calculateResult((state: {}) => {
        const stateWithNewKey = R.assocPath(arrayOfCurrentInputParents, propertyValue, state);
        return R.dissocPath(arrayOfPrevInputParents, stateWithNewKey);
      });
    } else {
      calculateResult((state: {}) =>
        R.assocPath(arrayOfCurrentInputParents, savedPropValue, state)
      );
      setInvalid(false);
    }
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
    /* 
        const updatedState = R.dissocPath(arrayOfPropertyPaths, calculatedData);
        calculateResult(updatedState);
        updatePreviewForm(updatedState);
    */
    calculateResult(removeProp);
    setRenderedKey(false);
  };

  const typeChanger = (
    <ValueTypeChanger
      defaultType={valueType as typesToConvert}
      setType={changeObjectPropertyType}
      disabled={isInvalid}
    />
  );
  const classNames = isInvalid ? 'previewRow__key--invalid' : 'previewRow__key';
  const renderKey = () => (
    <div className="previewRow__key-wrapper">
      <Input
        className={classNames}
        value={objKeyInput}
        onChange={onChangeKey}
        style={{ width: 120 }}
      />
      {isObject(savedPropValue) && (
        <AddPropMenu onAddHandler={onAddHandler(`${parent}.${objKeyInput}`)} disabled={isInvalid} />
      )}
      <RemoveButton onRemove={onPropRemove(parent, objKeyInput)} disabled={isInvalid} />
      <span className="previewRow__splitter">:</span>
    </div>
  );

  const renderProperty = () => {
    if (isObject(savedPropValue)) {
      return (
        <div className="preview-row__editor-wrapper">
          <span className="preview-form__object-brackets preview-form__object-brackets--open">
            {'{'}
          </span>
          <JsonEditor
            data={savedPropValue}
            calculateResult={calculateResult}
            calculatedData={calculatedData}
            updatePreviewForm={updatePreviewForm}
            parent={getPathOfProperty(parent, objKeyInput)}
            onAddProperty={onAddHandler}
          />
          <span className="preview-form__object-brackets preview-form__object-brackets--close">
            {'}'}
          </span>
        </div>
      );
    }

    return (
      <Input
        value={objValueInput}
        onChange={onChangeValue}
        style={{ width: 220 }}
        addonAfter={typeChanger}
        disabled={isInvalid}
      />
    );
  };
  const renderRow = () => (
    <div className="previewRow">
      {renderKey()}
      {renderProperty()}
    </div>
  );

  return isRenderedRow ? renderRow() : null;
};

export default PreviewRow;
