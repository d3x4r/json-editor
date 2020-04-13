import React from 'react';
import JsonEditor from '../JsonEditor';
import './PreviewForm.css';
import AddPropMenu from '../AddPropMenu';
import uniqueId from 'lodash.uniqueid';
import * as R from 'ramda';
import { typesOfNodes } from '../../types';

type PreviewFormProps = {
  data: {};
  calculateResult: (state: {}) => void;
  updateEditorState: (state: {}) => void;
  dataToRender: {};
};

interface newObject {
  name: string;
  value: string;
}

const getNewObject = (): newObject => {
  const objectId = uniqueId();
  const name = `newKey_${objectId}`;
  const value = `newValue_${objectId}`;
  return { name, value };
};

const getStateWithAddedProperty = (path: string[], value: string | {} = {}) => (state: {}) => {
  return R.assocPath(path, value, state);
};

const getAddedKeyPath = (parent: string, addedKey: string) =>
  [...parent.split('.'), addedKey].filter((key) => key);

const PreviewForm: React.FC<PreviewFormProps> = (props) => {
  const { data, calculateResult, updateEditorState, dataToRender } = props;

  const havingData = Object.keys(data).length;

  const addProperty = (parent: string = '') => (nodeType: typesOfNodes) => {
    const { name, value } = getNewObject();
    const addedKeyPath = getAddedKeyPath(parent, name);
    const getUpdatedState =
      nodeType === 'leaf'
        ? getStateWithAddedProperty(addedKeyPath, value)
        : getStateWithAddedProperty(addedKeyPath);
    const updatedState = getUpdatedState(dataToRender);
    updateEditorState(updatedState);
    calculateResult(updatedState);
  };

  return (
    <section className="preview-form">
      <h2 className="preview-form__title">Preview</h2>
      <div className="preview-form__result">
        {havingData ? (
          <>
            <span className="preview-form__object-brackets preview-form__object-brackets--open-root">
              {'{'}
            </span>
            <JsonEditor
              data={data}
              calculatedData={dataToRender}
              calculateResult={calculateResult}
              updatePreviewForm={updateEditorState}
              onAddProperty={addProperty}
              parent=""
            />
            <div className="preview-form__add-button-wrapper">
              <AddPropMenu onAddHandler={addProperty()} disabled={false} />
            </div>
            <span className="preview-form__object-brackets preview-form__object-brackets--close-root">
              {'}'}
            </span>
          </>
        ) : (
          <p className="preview-form__message">No data to render</p>
        )}
      </div>
    </section>
  );
};

export default PreviewForm;
