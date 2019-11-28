import React, { useState, useRef } from 'react'
import { Avatar, Icon, Comment, Tooltip, Input, Button } from 'antd'
import moment from 'moment'

// import css
import './index.scss'

const { TextArea } = Input;

const Index = (props) => {

const { comments, user, likeCount, img, content, postTime, postDay } = props
const postDay2 = new Date(`${postDay} ${postTime}`)
const { avatar, username } = user

  const [commentText, setCommentText] = useState('')
  const [showComment, setShowComment] = useState(false)
  const [showAllComment, setShowAllComment] = useState(false)
  const [botText, setBotText] = useState(true)
  const [commentData, setCommentData] = useState(comments ? comments : [])

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
            <Avatar size={45} src={avatar}/>
          </div>
          <div className='username'>
            <p ><i>{username}</i></p>
            <div className='time'>
                <a title={postDay}>{moment([postDay2.getFullYear(), postDay2.getMonth()+1, postDay2.getDate(), postDay2.getHours(), postDay2.getMinutes()]).fromNow()}</a>
          </div>
          </div>
          
        </div>
        <div className='body'>
          <img src={img}></img>
        </div>
        <div className='likes'>
          <Icon style={{ fontSize: '24px' }} type="like" />
          <Icon style={{ fontSize: '24px' }} type="heart" />
          <Icon style={{ fontSize: '24px' }} type="message" onClick={() => { setShowComment(!showComment) }} />
          <Icon style={{ fontSize: '24px' }} type="link" />
        </div>

        <div className='likeCount'>
          {likeCount} lượt thích
        </div>

        <div className='userContent'>
          <p style={{margin: 0}}>{username}</p>
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
          <TextArea value={commentText} placeholder="Type comment here ..." autoSize  style={{border: 'none'}} onChange={(e) => {onChangeCommentHandler(e)}}/>
          <Button onClick={() => postCommentHandler()}>Đăng</Button>
        </div>
      </div>
    </>
  )
}

export default Index