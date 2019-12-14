import React, { useState, useEffect } from 'react'
import { Table, Divider, Tag } from 'antd'


import './index.scss'

function Index() {


  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'userName',
      key: 'username',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tên',
      dataIndex: 'firstName',
      key: 'age',
    },
    {
      title: 'Họ',
      dataIndex: 'lastName',
      key: 'age',
    },
    {
      title: 'Thẻ',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color =  'green' 
            if (tag === 'Đã khoá') {
              color = 'red';
            }
            if (tag === 'Bình thường') {
              color = 'blue';
            }
            
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>Gửi email đổi mật khẩu</a>
          <Divider type='vertical'/>
          <a style={{color: 'red'}}>XOÁ</a>
        </span>
      ),
    },
  ];

  const data = [
{
  key: '1',
  userName: 'john1',
  firstName: 'John',
  lastName: 'Dick',
  tags:['Đã khoá']
},
{
  key: '2',
  userName: 'john1',
  firstName: 'John',
  lastName: 'Dick',
  tags:['Bình thường']
},
{
  key: '3',
  userName: 'john1',
  firstName: 'John',
  lastName: 'Dick',
  tags:['Mới đăng kí']
},
  ];

  return (
    <>
    <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Index