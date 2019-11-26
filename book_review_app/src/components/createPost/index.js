import React, { useEffect } from 'react'
import { Divider, Avatar, Input } from 'antd'
// import css
import './index.scss'

const { TextArea } = Input

const Index = (props) => {

  return (
    <>
      <div className='postForm'>
        <p style={{ marginRight: 'auto', marginBottom: 0 }}>Đăng bài</p>
        <Divider style={{ margin: '10px 0 20px 0' }} />
        <div className='main'>
          <Avatar size={45} src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/p720x720/60729624_1644917328985948_4362762753471938560_o.jpg?_nc_cat=100&_nc_ohc=_iULebdWibwAQmWeGhWMtAlJf4I4rF1MuehfEw2ervkmfYQl9Jj1C_8rA&_nc_ht=scontent.fsgn5-5.fna&oh=d36be4e73e04d17136dc1c843b6f0cea&oe=5E8422FD' />
          <TextArea
          className='text'
          placeholder="Cuốn sách của bạn thế nào ?"
          autoSize={{ minRows: 1, maxRows: 50 }}
          style={{borderColor: 'transparent', fontSize: '18px'}}
        />
        </div>
      </div>
    </>
  )
}

export default Index