import React, { useState } from 'react'
import NavBar from '../../components/nav'

//import components
import Post from '../../components/post'
import Infor from '../../components/infor'
import FirstRegister from '../../components/firstRegister'
import LeftBar from '../../components/leftBar'

// import css
import './index.scss'

const comments1 = [
  {
    author: "taingo6798",
    comment: "Sách gì mà hayyyy",
    action: null,
    likes: "0",
    disLikes: "0"
  },

  {
    author: "thedang",
    comment: "Tôi không thích đọc sách",
    action: null,
    likes: "0",
    disLikes: "0"
  },
  {
    author: "vudat",
    comment: "Sách hay đó bruhh !",
    action: null,
    likes: "0",
    disLikes: "0"
  }
]
const comments2 = [
  {
    author: "taingo6798",
    comment: "=)))))",
    action: null,
    likes: "0",
    disLikes: "0"
  },

  {
    author: "thedang",
    comment: "Nhai quài ko chán ? ",
    action: null,
    likes: "0",
    disLikes: "0"
  },
  {
    author: "vudat",
    comment: "lol !",
    action: null,
    likes: "0",
    disLikes: "0"
  }
]

const avaTai = 'https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/60691967_1644917332319281_1291613072405823488_n.jpg?_nc_cat=104&_nc_oc=AQk4A-gQJSJt1MiNN4AP3DY7enQY5nFBjtr8xi314GWXbVPqnyasF-RQxH-G1M9BHSeaqTFlPvHRWijNZ1wm2s4P&_nc_ht=scontent.fsgn5-4.fna&oh=dccd56a45d21dd4eec8aeeb93ddb6657&oe=5E52ADA4'
const avaThinh = 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/65450854_1439118286253966_6850397249990557696_n.jpg?_nc_cat=100&_nc_oc=AQklo7hQT3Bj4Pnl-IxqF-u-_ImvuiE_eCKXZ2H3sdb8JahTke0WvJBwG46cghcGScYdjP_DG1_BrHwnWgesCvzb&_nc_ht=scontent.fsgn5-5.fna&oh=dc4fa0d0d21e0ddd9c6120cbc1f02d9d&oe=5E4F3673'
const imgTai = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
const imgThinh = 'https://sachvui.com/cover/2015/thu-doan-chinh-tri.jpg'

const userTai = {
  firstName: 'taingo',
  avatar: avaTai,
  userContent: 'Sách này hay lắm nè mấy má <3'
}
const userThinh = {
  firstName: 'congthinh',
  avatar: avaThinh,
  userContent: 'Đó là dấu hiệu của sự lươn lẹo ...'
}


const Index = () => {
  const [visibleFirstTime, setVisibleFirstTime] = useState(false)

  return (
    <>
      <FirstRegister visible={visibleFirstTime} onCancel={() => setVisibleFirstTime(false)} />
      <NavBar />
      <div className='content'>
      <div className='leftBar'>
            <LeftBar />
        </div>
        <div className='wrapper'>
          <div className='posts'>
            <Post
              user={userTai}
              likeCount={256}
              data={comments1}
              img={imgTai}
            />

            <Post
              user={userThinh}
              likeCount={139}
              data={comments2}
              img={imgThinh} />

          </div>
          <div className='infor'>
            <Infor user={userTai} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Index