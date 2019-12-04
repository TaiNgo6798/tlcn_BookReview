import React, { useState, useEffect } from 'react'
import NavBar from '../../components/nav'
import { Skeleton, Empty  } from 'antd'
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

//import redux
import { useSelector, useDispatch } from 'react-redux'
import { setPost } from '../../actions/posts/setPost'

import firebase from "firebase";
import { loadMore } from '../../actions/posts/loadMore'
import { postNew, removeNewPost } from '../../firebase/my-firebase'

import withRealTime from '../../components/utils/hoc/withRealTime'



function Index(props) {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [postList, setPostList] = useState([])
  //redux
  const posts = useSelector(state => state.postReducer)
  const dispatch = useDispatch()

  useBottomScrollListener(() => {
    let lastPost = Object.values(posts[posts.length - 1])[0]
    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/review/post/${lastPost.numberTime}`,
    }).then((res) => {
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
      url: `http://localhost:8080/reviewbook/review/post`,

    }).then((res) => {
      dispatch(setPost(res.data))
      setPostList(res.data)
      setLoading(false)
    })

  }, [])

  const loadPosts = () => {
    const list = (posts ? posts : postList)
    try {
      return list.map((v, k) => {
        let value = Object.values(v)[0]
        let id = Object.keys(v)[0] //id bai viet
        let postUser = {
          id: value.uid,
          avatar: value.urlUser,
          username: value.name
        }
        return <Post key={k}
          img={value.urlImage}
          user={postUser} // nguoi dang
          likes={value.likes ? value.likes : {}}
          commentCount={value.comments ? Object.keys(value.comments).length : 0}
          content={value.desc}
          postTime={value.time}
          id={id}
          idCurrentUser={currentUser ? currentUser.id : null}
        />
      })
    }
    catch(err){
      console.log(err)
      return <Empty />
    }
  }

  // firebase.database().ref().child("Reviews").on('child_added', function (snapshot) {

  // })

  return (
    <>
    {
      localStorage.getItem('token') === 'setting account' &&
       <FirstRegister setCurrentUser={(u) => setCurrentUser(u)}/>
    }
      <NavBar />
      <div className='content'>
        <div className='leftBar'>
          <LeftBar />
        </div>
        <div className='wrapper'>
          <div className='center-content'>
            <CreatePost user={currentUser ? currentUser : { image: '', firstName: 'anonymous' }}/>
            <Skeleton loading = {loading} active >
            <div className='posts'>
              {loadPosts()}
            </div>
            </Skeleton>
          </div>
          <div className='infor'>
            <Infor user={currentUser ? currentUser : { image: '', firstName: 'anonymous' }} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index