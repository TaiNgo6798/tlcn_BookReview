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

  return (
    <>
      <NavBar />
     
    </>
  )
}

export default withAuth(Index)