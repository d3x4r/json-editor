import React from 'react';
import { Button } from 'antd';

interface AddPropertyBtnProps {
  onClick: () => void;
}

const AddPropertyBtn: React.FC<AddPropertyBtnProps> = (props) => {
  const { onClick } = props;
  return (
    <Button onClick={onClick} size="small" shape="round" style={{ borderColor: '#3f6600' }}>
      Add leaf
    </Button>
  );
};

export default AddPropertyBtn;
