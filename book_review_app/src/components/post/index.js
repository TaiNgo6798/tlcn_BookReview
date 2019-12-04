import React, { useState, useRef, useEffect } from 'react'
import { Avatar, Comment, Tooltip, Input, Button, Popover, Icon as Ico } from 'antd'
import moment from 'moment'
import htmlParser from 'react-html-parser'
import { Icon } from 'react-icons-kit'
import { heart } from 'react-icons-kit/fa/heart'
import { heartO } from 'react-icons-kit/fa/heartO'
// import css
import './index.scss'
import axios from 'axios'


const { TextArea } = Input;

const Index = (props) => {
  const { commentCount, user, likes, img, content, postTime, id, idCurrentUser } = props
  const postDay2 = new Date(postTime)
  const { avatar, username } = user
  const [commentText, setCommentText] = useState('')
  const [showComment, setShowComment] = useState(false)
  const [showAllComment, setShowAllComment] = useState(false)
  const [commentData, setCommentData] = useState([])
  const [likeLocal, setLikeLocal] = useState([])
  const [iconType, setIconType] = useState(Object.keys(likes).indexOf(idCurrentUser) !== -1 ? heart : heartO)
  const currentUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    let likeList = []
    Object.keys(likes).forEach((v, k) => {
      likeList.push({
        id: v,
        name: Object.values(likes)[k]
      })
    })
    setLikeLocal(likeList)

    const likeBtn = window.document.querySelector(`[id=${id}]`)
    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('isLiked')
      likeBtn.classList.contains('isLiked') ?
        setIconType(heart) : setIconType(heartO)
    })

    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/review/comment/${id}`,

    }).then((res) => {
      if (res.data.success !== false) {
        let arr = []
        Object.keys(res.data).forEach((k, i) => {
          let value = Object.values(res.data)[i]
          arr.push({
            id: k,
            body: value.body,
            id_user: value.id_user,
            imageUser: value.imageUser,
            nameUser: value.nameUser,
            time: value.time
          })
        })
        setCommentData(arr)
      }

    })
  }, [])

  const whoLikes = () => {
    let html = ``
    likeLocal.forEach(v => {
      html += `<p>${v.name}<p/>`
    })
    return htmlParser(html)
  }

  const likeHandler = () => {
    const likeBtn = window.document.querySelector(`[id=${id}]`)
    if (likeBtn.classList.contains('isLiked')) {
      console.log('liked !')
      likeLocal.push({
        id: idCurrentUser,
        name: `${currentUser.firstName}  ${currentUser.lastName}`
      })
      setLikeLocal([...likeLocal])
    }
    else {
      console.log('disliked !')
      setLikeLocal([...likeLocal.filter(v => v.id !== idCurrentUser)])
    }

    axios({
      method: 'post',
      url: `http://localhost:8080/reviewbook/review/like/${id}?token=${localStorage.getItem('token')}`,

    }).then(() => {

    })
  }


  const onChangeCommentHandler = (e) => {


    setCommentText(e.target.value)
  }

  const postCommentHandler = () => {
    let newComment = {
      body: commentText,
      id_user: idCurrentUser,
      imageUser: currentUser.image,
      nameUser: `${currentUser.firstName} ${currentUser.lastName}`,
      time: moment().format()
    }
    let data = [...commentData]
    data.unshift(newComment)
    setCommentData(data)

    axios({
      method: 'post',
      url: `http://localhost:8080/reviewbook/review/comment/${id}?token=${localStorage.getItem('token')}`,
      data: {
        body: commentText
      }
    }).then(() => {

    })

    setShowAllComment(true)
    window.document.querySelector('#cmtText').value = ''
  }

  const renderComments = () => {
    return (
      Object.values(commentData).map((v, k) => {
        let time2 = new Date(v.time)
        return (
          <Comment
            key={Object.keys(commentData)[k]}
            author={v.nameUser}
            avatar={
              <Avatar
                src={v.imageUser}
                alt={v.time}
              />
            }
            content={
              <p>
                {v.body}
              </p>
            }
            datetime={
              <Tooltip title={time2.toLocaleString()}>
                <span>{
                  moment([time2.getFullYear(), time2.getMonth(), time2.getDate(), time2.getHours(), time2.getMinutes(), time2.getSeconds(), time2.getMilliseconds()])
                    .fromNow()
                }</span>
              </Tooltip>
            }
          />
        )
      })
    )
  }

  return (
    <>
      <div className='postForm'>
        <div className='header'>
          <div className='avatar'>
            <Avatar size={45} src={avatar} />
          </div>
          <div className='username'>
            <p ><i>{username}</i></p>
            <div className='time'>
              <a title={postTime}>{
                moment([postDay2.getFullYear(), postDay2.getMonth(), postDay2.getDate(), postDay2.getHours(), postDay2.getMinutes(), postDay2.getSeconds(), postDay2.getMilliseconds()])
                  .fromNow()
              }</a>
            </div>
          </div>

        </div>
        <div className='body'>
          <img src={img}></img>
        </div>
        <div className='likes'>
          <Icon size={24} icon={iconType} className={Object.keys(likes).indexOf(idCurrentUser) !== -1 ? 'isLiked' : ''} id={id} onClick={() => likeHandler()} />
          <Ico style={{ fontSize: '24px' }} type="message" onClick={() => { setShowComment(!showComment) }} onClick={() => setShowAllComment(true)} />
          <Ico style={{ fontSize: '24px' }} type="link" />
        </div>

        <div className='likes-and-comments'>
          <div className='likeCount'>
            <Popover content={whoLikes()}>
              {likeLocal.length} lượt thích
            </Popover>
          </div>
          <div className='commentsCount'>
            <a onClick={() => {
              setShowAllComment(true)
            }}
            >{commentCount} bình luận</a>
          </div>
        </div>
        <div className='userContent'>
          <p style={{ margin: '0 5px 0 0' }}>{username}</p>
          <p>{content}</p>
        </div>
        <div className='postComment'>
          <TextArea id='cmtText' placeholder="Type comment here ..." autoSize style={{ border: 'none' }}
            onPressEnter={(e) => postCommentHandler(e)}
            onChange={(e) => { onChangeCommentHandler(e) }}
          />
          <Button onClick={() => postCommentHandler()}>Đăng</Button>
        </div>
        <div className='comments'>
          {
            (showAllComment) && (
              renderComments()
            )
          }
          {showAllComment && (
            <div className='seeAll'>
              <a onClick={() => {
                setShowAllComment(!showAllComment)
              }
              }>Hide comments</a>
            </div>
          )
          }
        </div>

      </div>
    </>
  )
}

export default Index