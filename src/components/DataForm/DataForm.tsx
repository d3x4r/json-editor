import React from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

type DataFormProps = {
  currentValue: string;
  setValue: (value: string) => void;
  transformData: (value: string) => void;
};

const DataForm: React.FC<DataFormProps> = (props) => {
  const { currentValue, setValue, transformData } = props;

  const onFormSubmit = () => {
    transformData(currentValue);
    setValue('');
  };

  const onDataEdit = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedVaule = evt.target.value;
    setValue(updatedVaule);
  };

  return (
    <section className="data-form">
      <h2 className="data-form__title">Enter data</h2>
      <Form onFinish={onFormSubmit}>
        <Form.Item>
          <TextArea rows={12} value={currentValue} onChange={onDataEdit} />
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
