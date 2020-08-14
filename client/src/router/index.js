import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { throttle } from 'lodash'

import Home from '../containers/Home'
import { BasicLayout, getChildPath, getSubMenuInfo, findMenu } from '../layouts'
import { MenuContext } from '../contexts/MenuContext';
import { prefix, scrollTo } from '../utils'

import logo from '../assets/img/logo.svg'

export default function CoreRouter(){
  const { menus, openKeys, setOpenKeys, setActiveMenu, activeMenu } = useContext(MenuContext);

  const firstMenuId = getChildPath(menus[0])

  const [state, setState] = useState({
    bounds: {},
    curSection: firstMenuId,
    enableScroll: true, // 避免点击和滚动重复触发
  })

  const scrollToView = (pathname) => {
    scrollTo(state.bounds[pathname]).then(() => {
      setState((prev) => ({
        ...prev,
        enableScroll: true
      }))
    })
  }

  const hashHandler = (pathname) => {
    if(pathname) {
      setState(prev => ({
        ...prev,
        enableScroll: false
      }))
      // 设置当前菜单 id
      setActiveMenu(pathname)
      scrollToView(pathname)
    }
  }

  const menuItemRender = ({ pathname, content }) => {
    return (
      // eslint-disable-next-line
      <a onClick={() => hashHandler(pathname)}>
        {content}
      </a>
    )
  }

  // 设置菜单锚点
  const getAnchorPoints = () => {
    // 获取每个分类的位置
    const anchors = {}
    // 获取分类 ids
    const categoryIds = getSubMenuInfo(menus, d => d.path)
    categoryIds.forEach(category => {
      anchors[category] = document.getElementById(`${prefix}${category}`).getBoundingClientRect().top
    })
    setState(prev => ({
      ...prev,
      bounds: anchors
    }))
  }

  // 首次进来默认展示第一个菜单
  useEffect(() => {
    // 激活第一个菜单
    setActiveMenu(firstMenuId)
    // 激活 openKeys
    setOpenKeys([String(menus[0].id)])
  }, [])

  // 滚动自动自定位菜单
  useEffect(() => {
    getAnchorPoints()
  }, [])

  useEffect(() => {
    const handleScroll = throttle((e) => {
      // 是否开启滚动模式
      if(!state.enableScroll) return false
      const curPos = window.scrollY;
      const { bounds } = state
      
      const topSections = Object.keys(bounds).filter(key => {
        return bounds[key] - curPos < 100
      })

      let activeSection = null
      // 当前存在高亮的区域
      if (topSections.length > 0) {
        activeSection = topSections[topSections.length - 1]
      } else {
        activeSection = firstMenuId
      }
      // 一级菜单展开项
      const activeMenu = findMenu(menus, d => d.path === activeSection)
      if(activeMenu && activeMenu.parent) {
        const parentId = activeMenu.parent.id
        // todo: 增量支持？
        setOpenKeys([String(parentId)])
      }
      // 二级菜单选中
      activeSection && setActiveMenu(activeSection)
    }, 300)
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [state])

  return (
    <Fragment>
      <BasicLayout
        logo={logo}
        menus={menus}
        openKeys={openKeys}
        setOpenKeys={setOpenKeys}
        menuItemRender={menuItemRender}
        activeMenu={activeMenu}
        prefix='renyimen'
        title="任意门"
        tagline="之江实验室信息导航"
      >
        <Switch>
          <Route path="/" component={Home} exact />
        </Switch>
      </BasicLayout>
    </Fragment>
  )
}
