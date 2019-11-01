import React, { useState, useEffect } from 'react'
import { Input, Badge, Icon } from 'antd';


import './index.scss'

const { Search } = Input;

function Index() {

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
        if(window.pageYOffset >= 50 && heightChange === true)
        {
          window.document.querySelector('.nav').classList.add('minimize')
          console.log('alo')
          heightChange = false
        }
        if(window.pageYOffset <= 50 && heightChange === false) {
          window.document.querySelector('.nav').classList.remove('minimize')
          heightChange = true
        }
    })
  }, [])

  return (
    <div className='nav'>
      <div className='container'>
        <div className='logo'></div>
        <div className='searchBar'>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
        <div className='notify'>
          <Badge count={0}>
          <Icon type="usergroup-delete" className='icon'/>
          </Badge>
          <Badge count={messageCount}>
          <Icon type="mail"  className='icon'/>
          </Badge>
          <Badge count={5}>
          <Icon type="bell" className='icon'/>
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default Index