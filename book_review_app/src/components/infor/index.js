import React, { useEffect } from 'react'
import { Avatar } from 'antd'

import SuggestBooks from '../suggestBooks'
// import css
import './index.scss'

const booksData = [
  {
    name: 'book1',
    author: 'author1',
    reviewBy: 'user1',
    img: ''
  },
  {
    name: 'book2',
    author: 'author2',
    reviewBy: 'user2',
    img: ''
  },
  {
    name: 'book3',
    author: 'author3',
    reviewBy: 'user3',
    img: ''
  },
  {
    name: 'book4',
    author: 'author4',
    reviewBy: 'user4',
    img: ''
  },

]


const Index = (props) => {

  const { avatar, firstName } = props.user

  return (
    <>
      <div className='inforForm'>
        <div className='user'>
          <div className='avatar'>
            <Avatar size={45}  src={avatar}/>
          </div>
          <div className='username'>
            <h3><i>{firstName}</i></h3>
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