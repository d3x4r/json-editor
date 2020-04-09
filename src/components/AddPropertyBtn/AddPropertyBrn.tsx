import React from 'react';

interface AddPropertyBtnProps {
  onClick: () => void;
}

const AddPropertyBtn: React.FC<AddPropertyBtnProps> = (props) => {
  const { onClick } = props;
  return <button onClick={onClick}>Add leaf</button>;
};

export default AddPropertyBtn;
