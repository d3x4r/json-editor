import React, { useState, useEffect } from 'react';
import PageHeader from '../Header';
import DataForm from '../DataForm';
import PreviewForm from '../PreviewForm';
import Result from '../Result';
import { Layout } from 'antd';
import { Row, Col } from 'antd';

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [dataToRender, updateDataToRender] = useState({});

  const [editorState, updateEditorState] = useState(dataToRender);

  useEffect(() => {
    updateEditorState((state: {}) => {
      return dataToRender;
    });
  }, [dataToRender]);
  return (
    <Layout className="layout">
      <Header>
        <PageHeader />
      </Header>
      <Content style={{ padding: '25px 75px' }}>
        <Row gutter={[8, 8]}>
          <Col span={5}>
            <DataForm updateEditorData={updateDataToRender} />
          </Col>
          <Col span={14}>
            <PreviewForm
              data={editorState}
              calculateResult={updateDataToRender}
              updateEditorState={updateEditorState}
              dataToRender={dataToRender}
            />
          </Col>
          <Col span={5}>
            <Result data={dataToRender} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
