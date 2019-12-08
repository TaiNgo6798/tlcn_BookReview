import React, { useState, useEffect } from 'react'
import { Avatar, Badge, Icon, Input } from 'antd'


import './index.scss'


function Index(props) {

  const { htmlid, onClose, image, name } = props
  const [classNameBody, setClassNameBody] = useState(false)
  const [classNameHeader, setClassNameHeader] = useState(false)
  const [chatData, setChatData] = useState([
   {
     id: false,
     data: 'Chào bạn !'
   },
   {
     id: true,
     data: 'hello! bạn cũng xài app này hả ?'
   },
   {
     id: false,
     data: 'đúng rồi, hôm nay bạn cần mình giúp gì nè ?'
   },
   {
     id: true,
     data: 'À cũng ko có gì đâu :3'
   },
   {
     id: false,
     data: 'Nói đi đừng ngại'
   },
   {
     id: true,
     data: 'Tui muốn ai xem cái story này có một ngày thật tốt lành :D'
   },
  ])

  const loadChats = () => {
      return chatData.map((v,k) => {
        let className = ''
        let img = v.id ? JSON.parse(localStorage.getItem('user')).image : image
        className=v.id ? 'myChat' : ''
        return (
        <div className={`chat_item ${className}`}>
        <Avatar size={32} src={img} style={{marginTop: '5px'}}/>
        <div className='chat_data'>
          {v.data}
        </div>
        </div>
      )})
  }

  return <>
    <div className={`window_chatBar ${classNameHeader ? 'minimize_window_chatBar' : ''}`}  >
      <div className='header_window_chatBar window_width' onClick={() => {
        setClassNameBody(!classNameBody)
        setClassNameHeader(!classNameHeader)
      }}>
        <Badge color='green' style={{ backgroundColor: '#52c41a', margin: '5px' }}>
          <Avatar size={32} src={image} />
        </Badge>
        <p >{name}</p>
      </div>
      <Icon
        type="close"
        onClick={() => onClose(htmlid)}
        style={{
          position: 'absolute',
          marginTop: '1em',
          marginLeft: classNameBody ? '12em' : '18em'
        }}
      />
      <div className={`content_window_chatBar window_width ${classNameBody ? 'hide_window_chatBar' : ''}`} >
        {loadChats()}
      </div>
      <div className={`footer_window_chatBar window_width ${classNameBody ? 'hide_window_chatBar' : ''}`} >
        <Input style={{ border: 'none' }} placeholder='Nhập tin nhắn ...' />
      </div>
    </div>

  </>
}

export default Index