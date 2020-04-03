import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface RemoveButtonProps {
  onRemove: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onRemove }) => {
  return (
    <Button
      onClick={onRemove}
      icon={<DeleteOutlined style={{ color: 'red' }} />}
      title="remove property"
    ></Button>
  );
};

export default RemoveButton;
