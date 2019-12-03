import React, { useState, useEffect } from 'react'
import NavBar from '../../components/nav'
import { Divider } from 'antd'
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

//import HOC
import withAuth from '../../components/utils/hoc/authUser'

//import redux
import { useSelector, useDispatch } from 'react-redux'
import { setPost } from '../../actions/posts/setPost'

import firebase from "firebase";
import { loadMore } from '../../actions/posts/loadMore'
import { postNew, removeNewPost } from '../../firebase/my-firebase'




function Index(props) {
  const [visibleFirstTime, setVisibleFirstTime] = useState(true)
  const { currentUser } = props
  const idCurrent = currentUser ? Object.keys(currentUser)[0] : ''
  const [postList, setPostList] = useState([])
  //redux
  const posts = useSelector(state => state.postReducer)
  const dispatch = useDispatch()

  useBottomScrollListener(() => {
    let lastPost =  Object.values(posts[posts.length-1])[0]
    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/review/post/${lastPost.numberTime}`,
    }).then((res) => {
      console.log(res.data)
      postNew.map(v => {
        res.data.unshift(v)
      })
      //console.log(res.data)
      dispatch(loadMore(res.data))
      removeNewPost()
    })
  })

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/reviewbook/review/post',

    }).then((res) => {
      dispatch(setPost(res.data))
      setPostList(res.data)
    })
  }, [])

  const loadPosts = () => {
    const list = (posts ? posts : postList) 
    try{
      return list.map((v, k) => {
        let value = Object.values(v)[0]
        let id = Object.keys(v)[0] //id bai viet
        let postUser = {
          avatar: '',
          username: value.name
        }
        return <Post key={k}
          img={value.urlImage}
          user={postUser} // nguoi dang
          likes={value.likes ? value.likes: {}}
          content={value.desc}
          postTime={value.time}
          id={id}
          idCurrentUser={idCurrent}
        />
      })
    }
    catch{
      return ''
    }
     
  }

  // firebase.database().ref().child("Reviews").on('child_added', function (snapshot) {

  // })

  return (
    <>
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
            <Infor user={currentUser ? Object.values(currentUser)[0] : {avatar: '', firstName: 'anonymous'}} />
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(Index)