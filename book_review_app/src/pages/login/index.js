
import React, { useRef } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { withRouter } from 'react-router-dom'
// import css
import './index.scss'



const index = (props) => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // props.history.push('/newsFeed')
        axios({
          method: 'post',
          url: 'localhost:8080/reviewbook/login',
          data: {
            email: emailRef,
            password: passwordRef
          }
        }).then(function (res) {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    })
  }
  const { getFieldDecorator } = props.form

  return (
    <div className='container'>
      <div className='form-login'>
        <h2 style={{display:'block', textAlign: 'center'}}>Login</h2>
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
            <a className="login-form-forgot" href="/forgot">
              Forgot password
          </a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
          </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(index)
export default withRouter(WrappedNormalLoginForm)
