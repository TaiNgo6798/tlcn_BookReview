import React, { useState, useEffect } from 'react'
import NavBar from '../../components/nav'
import { Divider } from 'antd'
//import components
import Post from '../../components/post'
import Infor from '../../components/infor'
import FirstRegister from '../../components/firstRegister'
import LeftBar from '../../components/leftBar'
import CreatePost from '../../components/createPost'
import axios from 'axios'

// import css
import './index.scss'

//import HOC
import withAuth from '../../components/utils/hoc/authUser'



function Index(props) {
  const [visibleFirstTime, setVisibleFirstTime] = useState(false)
  const [postList, setPostList] = useState([])
  const { currentUser } = props

  useEffect(() => {
    console.log('asdasdasd')
    axios({
      method: 'get',
      url: 'http://localhost:8080/reviewbook/review/post',

    }).then((res) => {
      setPostList(res.data)
    })
  }, [] )

  const loadPosts = () => {
    return postList.map((v, k) => {
      let value = Object.values(v)[0]
      let postUser = {
        avatar: '',
        username: value.name
      }
      return <Post key={k}
        img={value.urlImage}
        user={postUser}
        likeCount='123'
        content={value.desc}
        postTime={value.time}
        postDay={value.date}
      />
    })
  }


  return (
    <>
    {
      console.log(props.currentUser)
    }
      <FirstRegister visible={visibleFirstTime} onCancel={() => setVisibleFirstTime(false)} />
      <NavBar />
      <div className='content'>
        <div className='leftBar'>
          <LeftBar />
        </div>
        <div className='wrapper'>
          <div className='center-content'>
                <CreatePost />
            <div className='posts'>
              {loadPosts()}
            </div>
          </div>
          <div className='infor'>
            <Infor user={currentUser} />
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(Index)