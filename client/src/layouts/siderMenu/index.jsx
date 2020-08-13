import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { renderMenu } from '../utils'

const { Sider } = Layout

const SiderMenu = props => {
  const { logo, collapsed, onCollapse, title, tagline, theme, menus, selectedMenus = [], style, menuItemRender, openKeys, setOpenKeys } = props
  const logoContent = (
    <div className="logo">
      <Link to="/">
        <div className="flex flex-v-center">
          {typeof logo === 'string' && <img className="responsive" src={logo} alt={title} />}
          {title && <h1 className='title'>{title}</h1>}
        </div>
        {(tagline && !collapsed) && <div class='tagline'>{tagline}</div>}
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
