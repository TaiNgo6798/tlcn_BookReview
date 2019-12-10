import React, { useState, useEffect } from 'react'
import NavBar from '../../components/nav'
import { Skeleton, Empty, Avatar, Tabs, Tag, Button } from 'antd'
import { books } from 'react-icons-kit/icomoon/books'
import { Icon } from 'react-icons-kit'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
//import components
import DetailProfile from './inforTab'
import Post from '../../components/post'
import CreatePost from '../../components/createPost'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Chatbar from '../../components/chatBar'
// import css
import './index.scss'

//import redux
import { useSelector, useDispatch } from 'react-redux'
import { setUserPost } from '../../actions/userPost/setUserPost'

const { TabPane } = Tabs

function Index(props) {
  const [loading, setLoading] = useState(true)
  const [postList, setPostList] = useState([])
  const [user, setUser] = useState({})
  const [profileKey, setProfileKey] = useState('1')
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))
  //redux
  const posts = useSelector(state => state.userPostReducer)
  const dispatch = useDispatch()
  const { userID } = props.match.params

  var heightChange = true

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 440 && heightChange === true) {
        window.document.querySelector('.infor_profile') && window.document.querySelector('.infor_profile').classList.add('fixedPos_profile')
        heightChange = false
      }
      if (window.scrollY <= 440 && heightChange === false) {
        window.document.querySelector('.infor_profile') && window.document.querySelector('.infor_profile').classList.remove('fixedPos_profile')
        heightChange = true
      }
    })

    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/user/${userID}`,

    }).then((res) => {
      setUser(res.data)
    })

    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/review/post/own/${userID}`,

    }).then((res) => {
      dispatch(setUserPost(res.data))
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
          params={props.match.params} // kiem tra post dang o trang profile hay newsFeed de load lai danh sach post  theo redux
          img={value.urlImage}
          user={postUser} // nguoi dang
          likes={value.likes ? value.likes : {}}
          commentCount={value.comments ? Object.keys(value.comments).length : 0}
          content={value.desc}
          postTime={value.time}
          id={id}
          idCurrentUser={currentUser ? currentUser.id : null}
          title={value.title}
          kind={value.kind}
        />
      })
    }
    catch (err) {
      console.log(err)
      return <Empty />
    }
  }

  const loggoutHandler = () => {
    localStorage.clear()
    props.history.push('/')
  }

  return (
    <>
      <div className='content_profile'>
        <div className='wrapper_profile'>
          <div className='center-content_profile'>
            <div className='image-top_profile'>
              <div className='avatar_profile'>
                <Avatar size={170} src={user.image} />
              </div>
              <div className='footer_profile'>
                <div className='name_profile'>
                  <h1 style={{ zIndex: 2 }}>{`${user.firstName || ''} ${user.secondName || ''}`}</h1>
                </div>
                <div className='tabs_profile'>
                  <Tabs defaultActiveKey="1" onChange={(key) => setProfileKey(key)}>
                    <TabPane tab="Dòng thời gian" key="1">
                    </TabPane>
                    <TabPane tab="Giới thiệu" key="2">
                    </TabPane>
                  </Tabs>
                  {
                    (currentUser && currentUser.id) === props.match.params.userID && (
                      <Button type="danger" className='logout_profile' onClick={() => loggoutHandler()}>Logout</Button>
                    )
                  }
                </div>
              </div>
            </div>
            <div className='body_timeline_profile'>
              {
                profileKey === '1' ? (
                  <>
                  <div className='leftBar_profile'>
                    <div className='infor_profile'>
                      <h2>Giới thiệu</h2>
                      {
                        user.gender ? (user.gender === 'male' ?
                          <p><Tag color="geekblue">♂ Nam</Tag></p> : <p><Tag color="magenta">♀ Nữ</Tag></p>)
                          : ''
                      }
                      <div style={{ display: 'flex' }}>
                        <Icon size={18} icon={books} style={{ marginTop: '4px' }} />
                        <p style={{ margin: '6px 0 0 4px' }}>Đã review <b>328</b> cuốn sách</p>
                      </div>
                    </div>
                  </div>
                  <div className='posts_profile'>
                    <CreatePost user={currentUser ? currentUser : { image: '', firstName: 'anonymous' }} params={props.match.params} />
                    <Skeleton loading={loading} active >
                      {loadPosts()}
                    </Skeleton>
                  </div>
                  </>
                )
                  :
                  <DetailProfile />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Index)