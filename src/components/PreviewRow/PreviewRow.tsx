import React, { useState } from 'react';
import JsonEditor from '../JsonEditor';
import * as R from 'ramda';
import get from 'lodash.get';
import ValueTypeChanger from '../ValueTypeChanger';
import './PreviewRow.css';
import { Input } from 'antd';
import RemoveButton from '../RemoveButton';

interface PreviewRowProps {
  name: string;
  value: any;
  calculatedData: {};
  parent: string;
  calculateResult: (state: {}) => void;
  updatePreviewForm: (state: {}) => void;
}

type typesToConvert = 'string' | 'number' | 'boolean' | 'array';

const getPathOfProperty = (parentPath: string, property: string) =>
  parentPath ? `${parentPath}.${property}` : property;

const isObject = (item: any) => {
  return item instanceof Object && !(item instanceof Array);
};

const isArray = (item: any) => {
  return item instanceof Object && item instanceof Array;
};

const getValueType = (item: any) => (isArray(item) ? 'array' : typeof item);

const converters = {
  string: (value: any) => String(value),
  number: (value: any) => Number(value),
  boolean: (value: any) => Boolean(value),
  array: (value: any) => String(value).split(','),
};

const convertValueType = (value: any, type: typesToConvert): any => {
  return converters[type](value);
};

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
  const [currentParent, setParent] = useState(parent);
  const [savedPropValue, savePropValue] = useState(objValue);
  const [objValueInput, setObjValueInput] = useState(objValue);
  const [valueType, setValueType] = useState(getValueType(objValueInput));
  const [isRenderedRow, setRenderedKey] = useState(true);

  const parentPath = parent.split('.').slice(0, -1).join('.');

  const changeObjectPropertyType = (valueType: string) => {
    setValueType(valueType);
    const convertedValue = isObject(objValueInput)
      ? objValueInput
      : convertValueType(objValueInput, valueType as typesToConvert);

    calculateResult((state: {}) =>
      R.assocPath(prevPath.split('.'), convertedValue, state)
    );
  };

  const prevPath = getPathOfProperty(parentPath, objKeyInput);
  const oldPropertyValue = get(calculatedData, prevPath);

  const onChangeKey = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = evt;

    const currentPath = getPathOfProperty(parentPath, value);

    calculateResult((state: {}) => {
      const stateWithNewAddedKey = R.assocPath(
        currentPath.split('.'),
        oldPropertyValue,
        state
      );
      const stateWithoutDeletedKey = R.dissocPath(
        prevPath.split('.'),
        stateWithNewAddedKey
      );
      return stateWithoutDeletedKey;
    });
    savePropValue(oldPropertyValue);
    setParent(currentPath);
    setObjKeyInput(value);
  };

  const onChangeValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = evt;

    const convertedValue = isObject(value)
      ? value
      : convertValueType(value, valueType as typesToConvert);

    calculateResult((state: {}) => {
      return R.assocPath(prevPath.split('.'), convertedValue, state);
    });
    setObjValueInput(value);
  };

  const onPropRemove = (parent: string, test: string) => () => {
    calculateResult((state: {}) => {
      return R.dissocPath(parent.split('.'), state);
    });

    updatePreviewForm((state: {}) => {
      return R.dissocPath(test.split('.'), state);
    });
    setRenderedKey(false);
  };

  const typeChanger = (
    <ValueTypeChanger
      defaultType={valueType}
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
      <RemoveButton onRemove={onPropRemove(currentParent, parent)} />
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
          parent={currentParent}
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
