import React, { useState } from 'react'
import { Icon, Button, Row, Col } from 'antd'

import './index.scss'

import EditModal from './editModal'

function Index() {

  const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
  const { firstName, lastName, gender, id, birthday, email, image, phone } = currentUser
  const [openEdit, setOpenEdit] = useState(false)

  return <>
    {openEdit && <EditModal onClose={() => setOpenEdit(false)} currentUser={currentUser}/>}
    <div className='container_detail_profile'>
      <div className='titile_detail_profile'>
        <h1>Giới thiệu</h1>
      </div>

      {/* //thong tin ca nhan */}
      <Row type='flex' justify='space-between'>
        <Col>
          <h2><Icon style={{ fontSize: '22px' }} type="user" />  Thông tin cá nhân</h2>
        </Col>
        <Col>
          <Button type="dashed" onClick={() => setOpenEdit(true)}><Icon type="edit" />Chỉnh sửa</Button>
        </Col>
      </Row>

      <div className='infor_detail_profile'>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Tên tài khoản</p>
          <p>{`${firstName} ${lastName}`}</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Giới tính</p>
          <p>{gender}</p>
        </div>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Ngày sinh</p>
          <p>{birthday}</p>
        </div>
        <hr className='hr_profile' />
      </div>

      {/* // thong tin lien he */}
      <h2><Icon style={{ fontSize: '22px' }} type="phone" />  Thông tin liên hệ</h2>
      <div className='infor_detail_profile'>
        <hr className='hr_profile' />
        <div className='row_detail_profile'>
          <p>Số điện thoại</p>
          <p>{phone}</p>
        </div>

        <hr className='hr_profile' />
      </div>

      {/* // moi quan he */}
      <h2><Icon style={{ fontSize: '22px' }} type="heart" theme='filled' />  Mối quan hệ</h2>
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