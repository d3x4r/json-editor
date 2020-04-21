import React, { useContext } from 'react';
import alertContext from '../../context';
import { Alert as AlertModal } from 'antd';
import './Alert.css';

import { Collapse } from 'antd';

const { Panel } = Collapse;

const Alert: React.FC = () => {
  const { message, visible, type, setVisible, closable = true } = useContext(alertContext);

  if (!visible) {
    return null;
  }

  const CollapseContainer = (
    <Collapse defaultActiveKey={['1']} bordered={false} style={{ backgroundColor: 'inherit' }}>
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
        closable={closable}
        afterClose={() => setVisible('error', 'error message', false)}
        data-testid="alert"
      />
    </div>
  );
};

export default Alert;
