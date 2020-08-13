import '@ant-design/pro-layout/dist/prolayout.min.css';
import ProLayout, {
  DefaultFooter,
} from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import { Result, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { Icon } from '@ant-design/compatible';

import logo from '../assets/img/logo.svg';


const menuDataRender = (menuList) => {
  console.log('===menuList===', menuList)
  return menuList.map((item) => {
    const localItem = {
      ...item,
      icon: item.icon && <Icon type={item.icon} />,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return localItem;
  })
};

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 蚂蚁金服体验技术部出品`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      }
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    children,
    location = {
      pathname: '/',
    },
  } = props;

  const handleClick = (menuItem, e) => {
    e.preventDefault()
    console.log('===menuItem===', menuItem)
    return false
  }

  return (
    <ProLayout
      logo={logo}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          console.log('defaultDom', defaultDom)
          return defaultDom;
        }
        return (
          <Link to={menuItemProps.path} onClick={(event) => handleClick(menuItemProps, event)}>
            {menuItemProps.icon} {menuItemProps.name}
         </Link>
        );
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={menuDataRender}
      {...props}
    >
        {children}
    </ProLayout>
  );
};

export default withRouter(BasicLayout)
