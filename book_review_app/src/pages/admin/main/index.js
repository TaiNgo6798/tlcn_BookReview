import React, { useState, useEffect } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import './index.scss'

import Logo from '../../../assets/logo.png'
//components
import Approve from './approve'
import PostManager from './posts'
import AccountManager from './account'
import Dashboard from './dashboard'

const {  Content, Sider } = Layout

function Index() {
  const [activeMenu, setActiveMenu] = useState('1')
  const menuText = ['Dashboard', 'Duyệt bài', 'Quản lý bài viết',  'Quản lý tài khoản']
  return (
    <>
      <Layout>
        
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <img src={Logo} className='logo_admin' />
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              onSelect={(e) => setActiveMenu(e.key)}
              style={{ height: '100%', borderRight: 0, display: 'flex', flexDirection: 'column', paddingTop: '4em'}}
            >
                <Menu.Item key="1"><Icon type="home" />Dashboard</Menu.Item>
                <Menu.Item key="2"><Icon type="carry-out" />Duyệt bài</Menu.Item>
                <Menu.Item key="3"><Icon type="inbox" />Quản lý bài viết</Menu.Item>
                <Menu.Item key="4"><Icon type="team" />Quản lý tài khoản</Menu.Item>
                <Menu.Item key="5" style={{position: "fixed", bottom: 0}}><Icon type="logout" />Đăng xuất</Menu.Item>

            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <h1 style={{fontSize: 'large'}}>{menuText[activeMenu-1]}</h1>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {
                activeMenu === '1' && 
                <>
                <Dashboard />
                </>
              }
              {
                activeMenu === '2' && 
                <>
                <Approve />
                </>
              }
              {
                activeMenu === '3' && 
                <>
                <PostManager />
                </>
              }
              {
                activeMenu === '4' && 
                <>
                <AccountManager />
                </>
              }
              
        </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}

export default Index