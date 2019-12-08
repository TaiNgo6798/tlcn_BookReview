import React from 'react'
import { Icon } from 'antd'
import { Icon as Ico } from 'react-icons-kit'
import {ic_phone} from 'react-icons-kit/md/ic_phone'
import './index.scss'

function Index() {
  return <>
    <div className='container_detail_profile'>
      <div className='titile_detail_profile'>
        <h1>Giới thiệu</h1>
      </div>

        {/* //thong tin ca nhan */}
      <h2><Icon style={{ fontSize: '22px' }} type="user" />  Thông tin cá nhân</h2>
      <div className='infor_detail_profile'>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Tên tài khoản</p>
          <p>Tai Ngo</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Giới tính</p>
          <p>Nam</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Ngày sinh</p>
          <p>6/7/1998</p>
        </div>
        <hr className='hr_profile' />
      </div>

      {/* // thong tin lien he */}
      <h2><Icon style={{ fontSize: '22px' }} type="phone" />  Thông tin liên hệ</h2>
      <div className='infor_detail_profile'>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Số điện thoại</p>
          <p>0123456789</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Địa chỉ hiện tại</p>
          <p>38 Cây Keo</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Quê quán</p>
          <p>HCM</p>
        </div>
        <hr className='hr_profile' />
      </div>

      {/* // moi quan he */}
      <h2><Icon style={{ fontSize: '22px' }} type="heart" theme='filled'/>  Mối quan hệ</h2>
      <div className='infor_detail_profile'>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Tình trạng</p>
          <p>chưa cập nhật</p>
        </div>
    
        <hr className='hr_profile' />
      </div>

      {/* //cong viec */}
      <h2><Icon style={{ fontSize: '22px' }} type="desktop" />  Công việc và học vấn</h2>
      <div className='infor_detail_profile'>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Trường học</p>
          <p>chưa cập nhật</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Công ty</p>
          <p>chưa cập nhật</p>
        </div>
        <hr className='hr_profile' />
      </div>
    </div>
  </>
}

export default Index