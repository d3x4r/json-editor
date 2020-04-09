import React from 'react';
import { Select } from 'antd';
import './ValueTypeChanger.css';
import { typesToConvert } from '../../types';

const { Option } = Select;

interface ValueTypeChanger {
  defaultType: typesToConvert;
  setType: (value: typesToConvert) => void;
}

const ValueTypeChanger: React.FC<ValueTypeChanger> = ({ defaultType, setType }) => {
  return (
    <Select
      className="value-type-changer"
      defaultValue={defaultType}
      style={{ width: 90 }}
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
