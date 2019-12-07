import React, { useState, useEffect } from 'react'
import { Input, Badge, Icon } from 'antd';
import { withRouter } from 'react-router-dom'

import './index.scss'

const { Search } = Input;

function Index(props) {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const [ messageCount, setMessageCount ] = useState(0)
  let heightChange = true
  const loadNotify = () => {
    setInterval(() => {
      setMessageCount(messageCount => messageCount + 1)
    }, 1000);
  }
  useEffect(() => {
    loadNotify()
    window.addEventListener('scroll', () => {
        if(window.scrollY >= 50 && heightChange === true)
        {
          window.document.querySelector('.nav') && window.document.querySelector('.nav').classList.add('minimize')
          window.document.querySelector('.inforForm') && window.document.querySelector('.inforForm').classList.add('fixedPos')
          heightChange = false
        }
        if(window.scrollY <= 50 && heightChange === false) {
          window.document.querySelector('.nav') && window.document.querySelector('.nav').classList.remove('minimize')
          window.document.querySelector('.inforForm') && window.document.querySelector('.inforForm').classList.remove('fixedPos')
          heightChange = true
        }
    })
  }, [])

  return (
    <div className='nav'>
      <div className='container'>
        <div className='logo' onClick={() => props.history.push(`/newsFeed`)}></div>
        <div className='searchBar'>
          {/* <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          /> */}
        </div>
        <div className='notify'>
          <Badge count={messageCount}>
          <Icon type="mail"  className='icon'/>
          </Badge>
          <Badge count={5}>
          <Icon type="bell" className='icon'/>
          </Badge>
          {
            currentUser && (
              <Badge count={0}>
              <Icon type="user" className='icon' onClick={() => props.history.push(`/profile/${currentUser.id}`)}/>
              </Badge>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default withRouter(Index)