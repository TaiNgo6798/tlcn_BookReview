import React, { useState, useEffect } from 'react'
import NavBar from '../../components/nav'

//import components
import Post from '../../components/post'
import Infor from '../../components/infor'
import FirstRegister from '../../components/firstRegister'
import LeftBar from '../../components/leftBar'
import axios from 'axios'

// import css
import './index.scss'

//import HOC
import  withAuth from '../../components/utils/hoc/authUser'



function Index(props) {
  const [visibleFirstTime, setVisibleFirstTime] = useState(false)
  const [postList, setPostList] = useState([])
  const [user, setUser] = useState({avatar: '', username:'Undefine'})

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/reviewbook/review/post',
      
    }).then((res) => {
      console.log(res.data)
        setPostList(res.data)
      })
    },[])
  
  const loadPosts = () => {
      return postList.map((v,k) => {
        let value = Object.values(v)[0]
        let postUser = {
          avatar: '',
          username: value.name
        }
        return <Post key={k} 
        img={value.urlImage} 
        user={postUser}
        likeCount={value.likes.length}
        content={value.desc}
        />
      })
  }
  

  return (
    <>
      <FirstRegister visible={visibleFirstTime} onCancel={() => setVisibleFirstTime(false)} />
      <NavBar />
      <div className='content'>
      <div className='leftBar'>
            <LeftBar />
        </div>
        <div className='wrapper'>
          <div className='posts'>
            {console.log(props.currentUser)}
          {loadPosts()}
          </div>
          <div className='infor'>
            <Infor user={user}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default withAuth(Index)