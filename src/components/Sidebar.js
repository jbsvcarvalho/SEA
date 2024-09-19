import React from 'react';
import { Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegBuilding, FaUser } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { PiNetwork } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import styled from 'styled-components';

const MENU_BACKGROUND_COLOR = '#578597';
const ACTIVE_ITEM_BAR_COLOR = 'white';

const CustomMenu = styled(Menu)`
  height: 100vh;
  background-color: ${MENU_BACKGROUND_COLOR};
  width: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;

  .ant-menu-item {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1px 0;
    color: white;
    background: none;
    border-radius: 0;
  }

  .ant-menu-item-selected {
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      background-color: ${ACTIVE_ITEM_BAR_COLOR};
    }
  }

  svg {
    font-size: 20px;
  }
`;

const menuItems = [
  { key: '1', path: '/', icon: <FaRegBuilding  style={{ fontSize: '15px'}}/> },
  { key: '2', path: '/employees', icon: <LiaEdit style={{ fontSize: '15px'}}/> },
  { key: '3', path: '/network', icon: <PiNetwork style={{ fontSize: '15px'}}/> },
  { key: '4', path: '/notifications', icon: <IoIosNotificationsOutline style={{ fontSize: '15px'}} /> },
  { key: '5', path: '/users', icon: <FaUser style={{ fontSize: '15px'}}/> }
];

const Sidebar = () => (
  <CustomMenu mode="inline" defaultSelectedKeys={['1']}>
    {menuItems.map(item => (
      <Menu.Item key={item.key}>
        <Button size='small'>
          <Link to={item.path}>{item.icon}</Link>
        </Button>
      </Menu.Item>
    ))}
  </CustomMenu>
);

export default Sidebar;
