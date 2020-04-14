import React, { useContext } from 'react';
import alertContext from '../../context';
import { Alert as AlertModal } from 'antd';
import './Alert.css';

import { Collapse } from 'antd';

const { Panel } = Collapse;

const Alert: React.FC = () => {
  const { message, visible, type, setVisible } = useContext(alertContext);

  if (!visible) {
    return null;
  }

  const CollapseContainer = (
    <Collapse defaultActiveKey={['1']} bordered={false}>
      <Panel header="Show" key="1">
        {message}
      </Panel>
    </Collapse>
  );
  return (
    <div className="alert">
      <AlertModal
        message={type?.toUpperCase()}
        description={CollapseContainer}
        type={type}
        showIcon
        closable
        afterClose={() => setVisible('error', 'gg', false)}
      />
    </div>
  );
};

export default Alert;
