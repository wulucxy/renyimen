import React from 'react'
import { Menu } from 'antd'
import { Icon } from '@ant-design/compatible'
import { get } from 'lodash'

// 渲染菜单和子菜单
export function renderMenu(menu, options = {}) {
  return hasChild(menu) ? (
    <Menu.SubMenu key={menu.id} title={getMenuItem(menu, options)}>
      {menu.children && menu.children.map(d => renderMenu(d, options))}
    </Menu.SubMenu>
  ) : (
    <Menu.Item key={menu.id}>{getMenuItem(menu, options)}</Menu.Item>
  )
}

function hasChild(menu) {
  const hasChild = menu.children && menu.children.length > 0
  return !!hasChild
}

// 获取菜单 url，如果不存在 path 获取第一个子节点的 url
export const getChildPath = menu => {
  return menu ? menu.path || getChildPath(get(menu, 'children[0]')) : ''
}

// 获取菜单
function getMenuItem(menu, options = {}) {
  const { icon, name } = menu
  const pathname = menu.path

  const content = (
    <span>
      {icon && <Icon type={icon} />}
      <span>{name}</span>
    </span>
  )

  if (!pathname || hasChild(menu)) return content

  if (isHref(pathname)) {
    return (
      <a href={pathname} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  // 自定义渲染逻辑
  if(typeof options.menuItemRender === 'function') {
    return options.menuItemRender({
      pathname: pathname,
      content
    })
  }
  return <a href={pathname}>{content}</a>
}

function isHref(path) {
  return /^https?:\/\//.test(path)
}

// 根据分类字段按顺序获取分类 id
export const getSubMenuInfo = (menus, accessor) => {
  let categoryInfo = []
  menus.forEach(menu => {
    const children = get(menu, 'children')
    if(children.length) {
      children.forEach(child => categoryInfo.push(accessor(child)))
    }
  })
  return categoryInfo
}

// 遍历菜单项找到父组件
export const traverse = (trees, callback) => {
  for (const tree of trees) {
    if (callback(tree) === false) break
    if(tree.children) {
      traverse(tree.children, callback)
    }
  }
}

export const findMenu = (menus, finder) => {
  let menu = null
  traverse(menus, item => {
    if (finder(item)) {
      menu = item
      return false
    }
  })
  return menu
}
