import React, { useEffect } from 'react'
import { Avatar } from 'antd'

import SuggestBooks from '../suggestBooks'
// import css
import './index.scss'



const Index = (props) => {

  const { user } = props

  return (
    <>
      <div className='inforForm'>
        <div className='user'>
          <div className='avatar'>
            <Avatar size={45}  src={user ? user.avatar ? user.avatar : '' : ''}/>
          </div>
          <div className='username'>
            <h3><i>{user ? user.firstName ? user.firstName : '' : ''}</i></h3>
          </div>
        </div>
        <div className='suggestBooks'>
          <div className='top'>
              Sách gợi ý cho bạn 
              <a style={{float: 'right', paddingRight: '20px'}}>Xem tất cả</a>
          </div>
          <div className='listBooks'>
            <SuggestBooks /> 
          </div>
        </div>
        <div className='footer'>
            <p>Design and Code by Ngo Thanh Tai and Vu Tan Dat</p>
            <p>©2019 BookReview</p>
          </div>
      </div>
    </>
  )
}

export default Index