import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

type DataFormProps = {
  updateEditorData: (state: {}) => void;
};

const DataForm: React.FC<DataFormProps> = (props) => {
  const { updateEditorData } = props;
  const [inputValue, updateInputValue] = useState('');

  const onFormSubmit = () => {
    const objData = JSON.parse(inputValue);
    updateEditorData(objData);
    updateInputValue('');
  };

  const onChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInputValue(evt.target.value);
  };

  return (
    <section className="data-form">
      <h2 className="data-form__title">Enter data</h2>
      <Form onFinish={onFormSubmit}>
        <Form.Item>
          <TextArea rows={12} value={inputValue} onChange={onChangeHandler} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Render Preview
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default DataForm;
