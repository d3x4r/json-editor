import React from 'react';
import { Button } from 'antd';

interface AddTreeBtnProps {
  onClick: () => void;
}

const AddTreeBtn: React.FC<AddTreeBtnProps> = (props) => {
  const { onClick } = props;
  return (
    <Button onClick={onClick} size="small" shape="round" style={{ borderColor: '#3f6600' }}>
      Add Tree
    </Button>
  );
};

export default AddTreeBtn;
