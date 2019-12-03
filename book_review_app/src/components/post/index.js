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

//redux
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../actions/posts/setPost'


const { TextArea } = Input;

const Index = (props) => {
  const { comments, user, likes, img, content, postTime, id, idCurrentUser } = props
  const postDay2 = new Date(postTime)
  const { avatar, username } = user
  const [commentText, setCommentText] = useState('')
  const [showComment, setShowComment] = useState(false)
  const [showAllComment, setShowAllComment] = useState(false)
  const [botText, setBotText] = useState(true)
  const [commentData, setCommentData] = useState(comments ? comments : [])
  const [likeCount, setLikeCount] = useState(Object.keys(likes).length)

  useEffect(() => {
    const likeBtn = window.document.querySelector(`[id=${id}]`)
    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('isLiked')
    })
  }, [])

  const whoLikes = () => {
    let html = ``
    Object.values(likes).forEach(v => {
      html += `<p>${v}<p/>`
    })
    return htmlParser(html)
  }

  const likeHandler = () => { 
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
      author: 'current user',
      comment: commentText,
      action: null,
      likes: "0",
      disLikes: "0"
    }
    commentData.push(newComment)
    setCommentData([...commentData])
    setCommentText('')
    setShowComment(true)
    setShowAllComment(true)
    setBotText(false)
  }

  const renderComments = () => {
    const like = (k) => {
      let data = [...commentData]
      let comment = data[k]
      comment.likes = 1
      comment.disLikes = 0
      comment.action = 'liked'


      data.splice(k, 1, comment)
      setCommentData(data)
    }

    const dislike = (k) => {

      let data = [...commentData]
      let comment = data[k]
      comment.likes = 0
      comment.disLikes = 1
      comment.action = 'disliked'


      data.splice(k, 1, comment)
      setCommentData(data)
    }

    return (
      commentData.map((v, k) => {
        let { likes, disLikes, action } = v
        const actions = [
          <span key="comment-basic-like">
            <Tooltip title="Like">
              <Icon
                type="like"
                theme={action === 'liked' ? 'filled' : 'outlined'}
                onClick={() => like(k)}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
          </span>,
          <span key=' key="comment-basic-dislike"'>
            <Tooltip title="Dislike">
              <Icon
                type="dislike"
                theme={action === 'disliked' ? 'filled' : 'outlined'}
                onClick={() => { dislike(k) }}
              />
            </Tooltip>
            <span style={{ paddingLeft: 8, cursor: 'auto' }}>{disLikes}</span>
          </span>,
          <span key="comment-basic-reply-to">Reply to</span>,
        ]
        return (
          <Comment
            key={k}
            actions={actions}
            author={v.author}
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <p>
                {v.comment}
              </p>
            }
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().fromNow()}</span>
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
          <Icon size={24} icon={heart} className={Object.keys(likes).indexOf(idCurrentUser) !== -1 ? 'isLiked': ''} id={id} onClick={() => likeHandler()}/>
          <Ico style={{ fontSize: '24px' }} type="message" onClick={() => { setShowComment(!showComment) }} />
          <Ico style={{ fontSize: '24px' }} type="link" />
        </div>

        <div className='likeCount'>
          <Popover content={whoLikes()}>
            {likeCount} lượt thích
            </Popover>
        </div>


        <div className='userContent'>
          <p style={{ margin: '0 5px 0 0' }}>{username}</p>
          <p>{content}</p>
        </div>

        {
          (showComment) && (
            <div className='comments'>
              {
                (showAllComment) && (
                  renderComments()
                )
              }
              {
                (!showAllComment && commentData.length > 0) && (

                  <Comment

                    author={<a>{commentData[0].author}</a>}
                    avatar={
                      <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                      />
                    }
                    content={
                      <p>
                        {commentData[0].comment}
                      </p>
                    }
                    datetime={
                      <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                      </Tooltip>
                    }
                  />
                )
              }
              <div className='seeAll'>
                <a onClick={() => {
                  setShowAllComment(!showAllComment)
                  setBotText(!botText)
                }
                }>{botText === true ? 'See all comments' : 'See few comments'}</a>
              </div>

            </div>
          )
        }
        <div className='postComment'>
          <TextArea value={commentText} placeholder="Type comment here ..." autoSize style={{ border: 'none' }} onChange={(e) => { onChangeCommentHandler(e) }} />
          <Button onClick={() => postCommentHandler()}>Đăng</Button>
        </div>
      </div>
    </>
  )
}

export default Index