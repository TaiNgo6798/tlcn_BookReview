
import React, { useRef, useState } from 'react'
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import RegisterForm from './register-form'
import ForgotForm from './forgot-form'

// import css
import './index.scss'
//redux
import { useDispatch } from 'react-redux'
import { setUser } from '../../actions/user/setUser'


const Index = (props) => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [forgotForm, setForgotForm] = useState(false)
  const dispatch = useDispatch()
  const registerClick = () => {
    const loginForm = window.document.querySelector('.login')
     loginForm.classList.toggle('hide')
    const registerForm = window.document.querySelector('.register')
    registerForm.classList.toggle('show')
    const imgRight = window.document.querySelector('.right-image')
    imgRight.classList.toggle('hide-image')
    const imgLeft = window.document.querySelector('.left-image')
    imgLeft.classList.toggle('change-image')
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
        }).then(async function (res) {
          if (res.data.token) {
            let user = {
              id: Object.keys(res.data)[0],
              infor: Object.values(res.data)[0]
            }
            dispatch(setUser(user))
            //luu token 
            localStorage.setItem('token', Object.values(res.data)[1])
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
              <div className='img'>
              <div style={{marginLeft: '2em'}}></div>
                <div className='left-image'></div>
                <div className='right-image'></div>
              </div>
            <div className='form-center login'>
              <h1 style={{ display: 'block', textAlign: 'center' }}>Login</h1>
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
              </div>
            <div className='form-center register'>
              <h2 style={{ display: 'block', textAlign: 'center' }}>Register</h2>
              <RegisterForm className='form-register' backLogin={() => registerClick()} />
            </div>
        <ForgotForm onCancel={() => setForgotForm(false)} visible={forgotForm} />

      </div>

  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Index)
export default withRouter(WrappedNormalLoginForm)
