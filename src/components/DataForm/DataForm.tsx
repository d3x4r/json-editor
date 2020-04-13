import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
const { TextArea } = Input;

const JSONexample =
  '{"id":"0001","type":"donut","name":"Cake","image":{"url":"images/0001.jpg","width":200,"height":200},"thumbnail":{"url":"images/thumbnails/0001.jpg","width":32,"height":32}}';

type DataFormProps = {
  updateEditorData: (state: {}) => void;
};

const DataForm: React.FC<DataFormProps> = (props) => {
  const { updateEditorData } = props;
  const [inputValue, updateInputValue] = useState('');

  const onFormSubmit = () => {
    const objData = JSON.parse(inputValue);
    updateEditorData({});
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
          <Button type="default" onClick={() => updateInputValue(JSONexample)}>
            Paste Example
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default DataForm;
