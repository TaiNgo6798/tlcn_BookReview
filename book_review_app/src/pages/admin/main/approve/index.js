import React, { useState, useEffect } from 'react'
import { Table, Divider, Tag } from 'antd'
import axios from 'axios'

import './index.scss'

function Index() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:8080/reviewbook/approvereviews?token=${localStorage.getItem('tokenAdmin')}`,
    }).then((res) => {
      let arr = []
      Object.keys(res.data).map((key, i) => {
        let value = Object.values(res.data[i])[0]
        arr.push({
          id: key,
          stt: i+1,
          who: value.name,
          time: value.time,
          tags: ['Bài đăng đang đợi duyệt']
        })
      })
      setData([...arr])
    })
  }, [])

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Người đăng',
      dataIndex: 'who',
      key: 'who',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Thẻ',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map((tag, i) => {
            let color = 'orange';
            return (
              <Tag color={color} key={i}>
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

  return (
    <>
    <Table columns={columns} dataSource={data} />
    </>
  )
}

export default Index