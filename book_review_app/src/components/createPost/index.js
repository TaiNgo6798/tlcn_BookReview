import React, { useEffect, useState, useRef } from 'react'
import { Button, Divider, Avatar, Input, Upload, Icon, message } from 'antd'
// import css
import './index.scss'
//import firebase
import uploadStorage from '../../firebase/my-firebase'


const { TextArea } = Input

const Index = (props) => {

  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const titleRef = useRef(null)
  const kindRef = useRef(null)

const onSubmitPost = () => {
  console.log(titleRef.current.state.value)
  console.log(kindRef.current.state.value)
  console.log(imageUrl)
}

  useEffect(() => {
    const postEditor = window.document.querySelector('.text')
    const closeBtn = window.document.querySelector('.close-button')
    const body =  window.document.querySelector('.body-fake')
    
    window.document.addEventListener('scroll', () => {
      if(window.scrollY >= 350 )
        {
          body.classList.remove('modal-active')
          window.document.querySelector('.bottom-bar').classList.remove('show-from-post-component')
          closeBtn.classList.remove('show-from-post-component')
          window.document.activeElement.blur()
          setTimeout(() => {
            body.classList.remove('show-fake-body')
          }, 300);
        }

    })

    postEditor.addEventListener('focus', () => {
      body.classList.add('show-fake-body')
      setTimeout(() => {
        window.document.querySelector('.bottom-bar').classList.add('show-from-post-component')
        closeBtn.classList.add('show-from-post-component')
        body.classList.add('modal-active')
      }, 0);

      
    })
    closeBtn.addEventListener('click', () => {
      window.document.querySelector('.bottom-bar').classList.remove('show-from-post-component')
      closeBtn.classList.remove('show-from-post-component')
      body.classList.remove('modal-active')
      setTimeout(() => {
        body.classList.remove('show-fake-body')
      }, 300);

    })
  }, [])

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setImageUrl('')
      setIsLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setIsLoading(false)
        setImageUrl(imageUrl)
      }
      )
    }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const uploadButton = (
    <div>
      <Icon type={isLoading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <>
    <div className='body-fake'></div>
      <div className='createPostForm'>
        <div className='top-bar'>
        <p style={{ marginBottom: 0 }}>Đăng bài</p>
        <a className='close-button' style={{ marginRight: 'auto', marginBottom: 0, float: 'right' }}>x</a>
        </div>
        <Divider style={{ margin: '10px 0 20px 0' }} />
        <div className='main'>
          <Avatar size={45} src='https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/p720x720/60729624_1644917328985948_4362762753471938560_o.jpg?_nc_cat=100&_nc_ohc=_iULebdWibwAQmWeGhWMtAlJf4I4rF1MuehfEw2ervkmfYQl9Jj1C_8rA&_nc_ht=scontent.fsgn5-5.fna&oh=d36be4e73e04d17136dc1c843b6f0cea&oe=5E8422FD' />
          <TextArea
            className='text'
            placeholder="Bạn có đang muốn chia sẻ cuốn sách nào không ?"
            autoSize={{ minRows: 1, maxRows: 50 }}
            style={{ borderColor: 'transparent', fontSize: '18px' }}
          />
        </div>
        {/* <Divider style={{marginBottom: '15px'}}/> */}
        <div className='bottom-bar'>
          <div className='tool-bar'>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <div className='input-form'>
              <p style={{ marginBottom: '5px', color: '#B8BCBC' }}>Dòng này được thêm vào nhìn cho đỡ trống cái khúc này vậy thôi đó ...</p>
              <Input placeholder='Tiêu đề...' ref={titleRef} />
              <Input placeholder='Thể loại...' ref={kindRef} />
            </div>
          </div>
          <Button type='primary' style={{ display: 'block', width: '100%' }} onClick={onSubmitPost}>Đăng</Button>
        </div>
      </div>
    </>
  )
}

export default Index