import React, { useState, useEffect } from 'react'
import NavBar from '../../components/nav'
import { Skeleton, Empty, Avatar, Tabs } from 'antd'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
//import components
import Post from '../../components/post'
import Infor from '../../components/infor'
import FirstRegister from '../../components/firstRegister'
import LeftBar from '../../components/leftBar'
import CreatePost from '../../components/createPost'
import axios from 'axios'

// import css
import './index.scss'
const { TabPane } = Tabs

function Index(props) {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/review/post`,

    }).then((res) => {

    })
  }, [])

  return (
    <>
      <NavBar />
      <div className='content_profile'>
        <div className='wrapper_profile'>
          <div className='center-content_profile'>
            <div className='image-top_profile'>
              <div className='avatar_profile'>
                <Avatar size={170} src={JSON.parse(localStorage.getItem('user')).image} />
              </div>
              <div className='footer_profile'>
                <div className='name_profile'>
                  <h1 style={{ zIndex: 2 }}>{`${JSON.parse(localStorage.getItem('user')).firstName} ${JSON.parse(localStorage.getItem('user')).lastName}`}</h1>
                </div>
                <div className='tabs_profile'>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Dòng thời gian" key="1">
                      Content of Tab Pane 1
                  </TabPane>
                    <TabPane tab="Giới thiệu" key="2">
                      Content of Tab Pane 2
                  </TabPane>
                
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index