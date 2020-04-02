import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface ValueTypeChanger {
  defaultType: string;
  setType: (value: string) => void;
}

const ValueTypeChanger: React.FC<ValueTypeChanger> = ({
  defaultType,
  setType
}) => {
  return (
    <Select
      defaultValue={defaultType}
      style={{ width: 100 }}
      onChange={setType}
    >
      <Option value="string">String</Option>
      <Option value="number">Number</Option>
      <Option value="array">Array</Option>
      <Option value="boolean">Boolean</Option>
    </Select>
  );
};

export default ValueTypeChanger;
