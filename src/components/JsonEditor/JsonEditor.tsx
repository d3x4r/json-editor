import React from "react";
// import uniqueId from "lodash.uniqueid";
import PreviewRow from "../PreviewRow";

interface JsonEditorProps {
  data: { [key: string]: any };
  parent: string;
  onChangeHandler: (state: any) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = props => {
  const { data, onChangeHandler, parent } = props;
  const result = Object.keys(data).map(key => {
    const parentPath = parent ? `${parent}.${key}` : key;
    return (
      <PreviewRow
        name={key}
        value={data[key]}
        onChangeHandler={onChangeHandler}
        parent={parentPath}
        // key={uniqueId()}
      />
    );
  });

  return <div>{result}</div>;
};

export default JsonEditor;
