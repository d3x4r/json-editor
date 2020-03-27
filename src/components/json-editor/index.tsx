import React, { useState } from "react";

interface JsonEditorProps {
  initialData: { [key: string]: any };
  onChange: (data: JsonEditorProps["initialData"]) => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  initialData,
  onChange
}) => {
  const [state, setState] = useState(initialData);
  const result = Object.keys(state).map(key => {
    return (
      <>
        <input
          defaultValue={key}
          onChange={e => {
            const newData = { ...state, [key]: state[key] };
            onChange(newData);
            setState(newData);
          }}
        />
        :
        <input defaultValue={state[key]} />
        <br />
      </>
    );
  });
  return <>{result}</>;
};
