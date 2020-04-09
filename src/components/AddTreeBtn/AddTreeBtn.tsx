import React from 'react';

interface AddTreeBtnProps {
  onClick: () => void;
}

const AddTreeBtn: React.FC<AddTreeBtnProps> = (props) => {
  const { onClick } = props;
  return <button onClick={onClick}>Add Tree</button>;
};

export default AddTreeBtn;
