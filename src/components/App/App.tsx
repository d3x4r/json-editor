import React, { useState } from 'react';
import PageHeader from '../Header';
import DataForm from '../DataForm';
import PreviewForm from '../PreviewForm';
import Result from '../Result';
import { Layout } from 'antd';
import { Row, Col } from 'antd';

const { Header, Content } = Layout;

const exampleJSON =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3], "data": { "name": "John1", "age": 25, "isAdmin": true, "friends": [0,1,2,3], "nestedData1": { "name": "John2", "age": 15, "isAdmin": true, "friends": [0,1,2,3] } }, "testKey1": "testValue1", "testKey2": "testValue2", "testKey3": [1,2,3] }';

const App: React.FC = () => {
  const [data, setData] = useState(exampleJSON);
  const [previewData, setPreviewData] = useState(JSON.parse(data));

  const transformData = (stringData: string) => {
    const objData = JSON.parse(stringData);
    setPreviewData(objData);
  };

  return (
    <Layout className="layout">
      <Header>
        <PageHeader />
      </Header>
      <Content style={{ padding: '25px 75px' }}>
        <Row gutter={[8, 8]}>
          <Col span={3}>
            <DataForm
              currentValue={data}
              setValue={setData}
              transformData={transformData}
            />
          </Col>
          <Col span={14}>
            <PreviewForm data={previewData} calculateResult={setPreviewData} />
          </Col>
          <Col span={7}>
            <Result data={previewData} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
