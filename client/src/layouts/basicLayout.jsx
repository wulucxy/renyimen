import React from 'react'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom';

import SiderMenu from './siderMenu'
import GlobalHeader from './globalHeader'

const { Content, Footer } = Layout

const BasicLayout = (props) => {
  const {
    prefix,
    logo,
    theme = 'dark',
    collapsed = false,
    onCollapse,
    title,
    tagline,
    menus,
    openKeys,
    setOpenKeys,
    activeMenu,
    menuItemRender,
    children
  } = props

  return (
    <div>
        <Layout
          hasSider
          style={{
            minHeight: '100vh',
          }}
        >
          <SiderMenu
            collapsed={collapsed}
            onCollapse={onCollapse}
            logo={logo}
            title={title}
            tagline={tagline}
            theme={theme}
            menus={menus}
            openKeys={openKeys}
            setOpenKeys={setOpenKeys}
            selectedMenus={[activeMenu]}
            menuItemRender={menuItemRender}
            style={{
              position: 'fixed',
              left: 0,
              height: '100%'
            }}
          />
          <Layout className="content-layout">
            <GlobalHeader collapsed={collapsed} />
            <Content>
              <div id={`${prefix}-content`}>
                {children}
              </div>
            </Content>
            <Footer
              style={{ textAlign: 'center' }}
            >
              Copyright © {new Date().getFullYear()} 之江实验室
            </Footer>
          </Layout>
        </Layout>
      </div>
    )
}

export default withRouter(BasicLayout)
