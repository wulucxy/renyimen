import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { renderMenu } from '../utils'

const { Sider } = Layout

const SiderMenu = props => {
  const { logo, collapsed, onCollapse, title, tagline, theme, menus, selectedMenus = [], style, menuItemRender, openKeys, setOpenKeys } = props

  const logoStyle = collapsed ? {} : {
    paddingLeft: 10,
    marginBottom: 20,
  }

  const logoContent = (
    <div className="logo" style={logoStyle}>
      <Link to="/">
        <div className="flex flex-v-center">
          <div className='logo-wrapper'>
            {typeof logo === 'string' && <img className="responsive" src={logo} alt={title} />}
          </div>
          {title && !collapsed && <h1 className='title'>{title}</h1>}
        </div>
        {(tagline && !collapsed) && <div className='tagline'>{tagline}</div>}
      </Link>
    </div>
  )

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={style}
     >
      {logoContent}
      <Menu
        theme={theme}
        mode="inline"
        selectedKeys={selectedMenus}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      >
        {menus.map(menu => renderMenu(menu, {
          menuItemRender
        }))}
      </Menu>
    </Sider>
  )
}

export default SiderMenu
