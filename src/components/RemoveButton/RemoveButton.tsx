import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface RemoveButtonProps {
  onRemove: () => void;
  disabled: boolean;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove, disabled }) => {
  return (
    <Button
      onClick={onRemove}
      icon={<DeleteOutlined style={{ color: 'red' }} />}
      title="remove property"
      disabled={disabled}
    ></Button>
  );
};

export default RemoveButton;
