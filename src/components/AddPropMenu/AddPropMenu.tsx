import React from 'react';

import { Menu, Dropdown, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import { typesOfNodes } from '../../types';

interface AddPropMenuProps {
  onAddHandler: (type: typesOfNodes) => void;
  disabled: boolean;
}

const AddPropMenu: React.FC<AddPropMenuProps> = (props) => {
  const { onAddHandler, disabled } = props;
  const onClickHandler = (event: ClickParam) => {
    onAddHandler(event.key as typesOfNodes);
  };

  const menu = (
    <Menu onClick={onClickHandler}>
      <Menu.Item key="node">node</Menu.Item>
      <Menu.Item key="leaf">leaf</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
      <Button icon={<PlusOutlined style={{ color: '#5b8c00' }} />}></Button>
    </Dropdown>
  );
};

export default AddPropMenu;
