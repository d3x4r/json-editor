import React, { useState, useEffect } from 'react';
import AlertState from '../../context/AlertState';
import Alert from '../Alert';
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

  const [dataToView, setDataToView] = useState(dataToRender);

  useEffect(() => {
    updateEditorState((state: {}) => {
      return dataToRender;
    });
    setDataToView((state: {}) => {
      return dataToRender;
    });
  }, [dataToRender]);

  return (
    <AlertState>
      <Layout className="layout">
        <Alert />
        <Header>
          <PageHeader />
        </Header>
        <Content style={{ padding: '25px 75px' }}>
          <Row gutter={[8, 8]}>
            <Col span={4}>
              <DataForm updateEditorData={updateDataToRender} />
            </Col>
            <Col span={14}>
              <PreviewForm
                data={editorState}
                calculateResult={setDataToView}
                updateEditorState={updateEditorState}
                dataToRender={dataToView}
              />
            </Col>
            <Col span={6}>
              <Result data={dataToView} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </AlertState>
  );
};

export default App;
