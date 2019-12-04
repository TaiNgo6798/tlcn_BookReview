import React, { useState } from 'react'
import withAuth from '../utils/hoc/authUser'
import {  Input, Button} from 'antd'
import moment from 'moment'
import axios from 'axios'
const { TextArea } = Input

function Index(props) {
  const [commentText, setCommentText] = useState('')
  const { idPost, setShowAllComment } = props

  const onChangeCommentHandler = (e) => {
    setCommentText(e.target.value)
  }

  const postCommentHandler = () => {
    axios({
      method: 'post',
      url: `http://localhost:8080/reviewbook/review/comment/${idPost}?token=${localStorage.getItem('token')}`,
      data: {
        body: commentText
      }
    }).then(() => {

    })
    setShowAllComment(true)
    window.document.querySelector('#cmtText').value = ''
  }

  return (
    <div className='postComment'>
    <TextArea id='cmtText' placeholder="Type comment here ..." autoSize style={{ border: 'none' }}
      onPressEnter={(e) => postCommentHandler(e)}
      onChange={(e) => { onChangeCommentHandler(e) }}
    />
    <Button onClick={() => postCommentHandler()}>Đăng</Button>
  </div>
  )
}

export default withAuth(Index)