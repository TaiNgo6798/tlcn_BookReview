
import React, { useRef, useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import RegisterForm from './register-form'
import ForgotForm from './forgot-form'

// import css
import './index.scss'



const Index = (props) => {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [forgotForm, setForgotForm] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const registerClick = () => {
    setIsLogin(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // props.history.push('/newsFeed')

        axios({
          method: 'post',
          url: 'http://localhost:8080/reviewbook/login',
          data: {
            email: emailRef.current.state.value,
            password: passwordRef.current.state.value
          }
        }).then(function (res) {
          if (res.data.success) {
            // Swal.fire({
            //   position: 'center',
            //   type: 'success',
            //   title: 'Đăng nhập thành công !',
            //   showConfirmButton: false,
            //   timer: 1500
            // })
            props.history.push('/newsFeed')
          } else {
            Swal.fire({
              position: 'center',
              type: 'error',
              title: res.data,
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
    })
  }
  
  const { getFieldDecorator } = props.form

  return (
    <div className='container'>
      <div className='form-login'>
        {
          (isLogin) && (
            <>
              <h2 style={{ display: 'block', textAlign: 'center' }}>Login</h2>
              <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your email!' }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="Email"
                      ref={emailRef}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}
                    />,
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a className="forgotBtn" onClick={() => setForgotForm(true)}>
                    Forgot password
                </a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <a onClick={() => { registerClick() }}>register now!</a>
                </Form.Item>
              </Form>
            </>
          )
        }
        {
          (!isLogin) && (
            <>
              <h2 style={{ display: 'block', textAlign: 'center' }}>Register</h2>
              <RegisterForm backLogin={() => setIsLogin(true)} />
            </>
          )
        }

        <ForgotForm onCancel={() => setForgotForm(false)} visible={forgotForm}/>

      </div>
    </div>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Index)
export default withRouter(WrappedNormalLoginForm)
