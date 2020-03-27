import React, { useState } from "react";
import JsonEditor from "../JsonEditor";
import unset from "lodash.unset";
import set from "lodash.set";
import get from "lodash.get";
// import omit from "lodash.omit";
import "./PreviewRow.css";

interface PreviewRowProps {
  name: string;
  value: any;
  parent: string;
  onChangeHandler: (state: any) => void;
}

const getPathOfProperty = (parentPath: string, property: string) =>
  parentPath ? `${parentPath}.${property}` : property;

const isObject = (item: any) => {
  return item instanceof Object && !(item instanceof Array);
};

const PreviewRow: React.FC<PreviewRowProps> = props => {
  const { name, value: objValue, onChangeHandler, parent } = props;
  const [inputName, setInputName] = useState(name);
  const [currentParent, setParent] = useState(parent);
  // const valueIsObject =
  //   objValue instanceof Object && !(objValue instanceof Array);

  const onChangeKey = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = evt;
    onChangeHandler((state: any) => {
      const copyState = { ...state };

      const parentPath = parent
        .split(".")
        .slice(0, -1)
        .join(".");

      const prevPath = getPathOfProperty(parentPath, inputName);
      const currentPath = getPathOfProperty(parentPath, value);

      const oldValue = get(copyState, prevPath);
      if (isObject(oldValue)) {
        setParent(currentPath);
        set(copyState, currentPath, oldValue);
        unset(copyState, prevPath);
      } else {
        unset(copyState, prevPath);
        set(copyState, currentPath, objValue);
      }

      return copyState;
    });
    setInputName(value);
  };

  return (
    <div className="previewRow">
      <input
        className="previewRow__key"
        value={inputName}
        onChange={onChangeKey}
        data-type="keyInput"
      />
      <span className="previewRow__splitter">:</span>
      {isObject(objValue) ? (
        <JsonEditor
          data={objValue}
          onChangeHandler={onChangeHandler}
          parent={currentParent}
        />
      ) : (
        <input
          defaultValue={objValue}
          onChange={onChangeKey}
          data-type="valueInput"
        />
      )}
    </div>
  );
};

export default PreviewRow;
