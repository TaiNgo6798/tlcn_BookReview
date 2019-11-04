import React, { useRef, useState } from 'react'
import { Modal, Form, Input, Button, Spin } from 'antd'
import axios from 'axios'
// import css
import '../firstRegister/style.scss'

const Index = (props) => {

  const { getFieldDecorator } = props.form

  const { visible, onCancel } = props


  const [loading, setLoading] = useState(false)

  const settingHandler = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const { firstName, lastName, gender, phone } = values
        setLoading(true)
        axios({
          method: 'post',
          url: 'http://localhost:8080/reviewbook/setting',
          data: {
            firstName,
            secondName: lastName,
            gender,
            phone
          }
        }).then(() => {
          setLoading(true)
          onCancel()
        })
      }
    })
  }


  return (
    <>
      <Spin spinning={loading}>
        <Modal
          visible={visible}
          onCancel={() => { onCancel() }}
          footer={null}
          width='556px'
          className='login-form-forgot'
        >
          <div className='title'>Your information for first login !</div>
          <div className='text-1'>

          </div>
          <div className='text-2'>

          </div>
          <Form >
            <Form.Item>
              {getFieldDecorator('firstname', {
                rules: [
                  { required: true, message: 'Vui lòng nhập địa chỉ email' }
                ]
              })(<Input
                placeholder='First Name'
                
                size='large'
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('lastname', {
                rules: [
                  { required: true, message: 'Vui lòng nhập địa chỉ email' }
                ]
              })(<Input
                placeholder='Last Name'
                
                size='large'
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('gender', {
                rules: [
                  { required: true, message: 'Vui lòng nhập địa chỉ email' }
                ]
              })(<Input
                placeholder='Gender'
                
                size='large'
              />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: 'Vui lòng nhập địa chỉ email' }
                ]
              })(<Input
                placeholder='Phone'
               
                size='large'
              />)}
            </Form.Item>

            <Form.Item>
              <Button
                name='btn-send-request'
                type='primary'
                size='large'
                block
                className='btn-innos'
                onClick={(e) => settingHandler(e)}
              >
                Done
            </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Spin>
    </>
  )
}

const WrappedNormalForm = Form.create({ name: 'form' })(Index)
export default WrappedNormalForm