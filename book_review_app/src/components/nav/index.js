import React from 'react'
import { Input, Badge, Icon } from 'antd';


import './index.scss'

const { Search } = Input;

const index = () => {
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
          <Badge count={1}>
          <Icon type="usergroup-delete" className='icon'/>
          </Badge>
          <Badge count={15}>
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

export default index