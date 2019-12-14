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
      title: 'Người đăng',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'age',
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
            if (tag === 'Bài đang đợi duyệt') {
              color = 'orange';
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
          <a>DUYỆT CÁI NÀY</a>
          <Divider type="vertical" />
          <a style={{color: 'red'}}>BỎ QUA</a>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['Bài đang đợi duyệt'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['Bài đang đợi duyệt'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['Bài đang đợi duyệt'],
    },
  ];

  return (
    <>
    <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Index