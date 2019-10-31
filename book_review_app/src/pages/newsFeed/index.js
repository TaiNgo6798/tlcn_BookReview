import React from 'react'
import NavBar from '../../components/nav'

//import components
import Post from '../../components/post'
import Infor from '../../components/infor'

// import css
import './index.scss'


const index = () => {
  return (
    <>
      <NavBar />
      <div className='content'>
        <div className='wrapper'>
          <div className='posts'>
          <Post/>
          </div>
          <div className='infor'>
          <Infor/>
          </div>
        </div>
      </div>
    </>
  )
}

export default index