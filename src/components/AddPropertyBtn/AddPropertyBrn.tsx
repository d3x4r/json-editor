import React from 'react';

interface AddPropertyBtnProps {
  onClick: () => void;
}

const AddPropertyBtn: React.FC<AddPropertyBtnProps> = (props) => {
  const { onClick } = props;
  return <button onClick={onClick}>Add prop</button>;
};

export default AddPropertyBtn;
