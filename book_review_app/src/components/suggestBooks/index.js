import React, { useState, useEffect } from 'react'
import { List, Avatar, Button, Skeleton } from 'antd'
import reqwest from 'reqwest'
// import css
import './index.scss'




const Index = () => {
  const count = 8
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`

  useEffect(() => {

    getData(res => {
      setInitLoading(false)
      setData(res.results)
      setList(res.results)
    })

  }, [])

  const getData = callback => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res)
      },
    })
  }

  const onLoadMore = () => {
    setLoading(true)
    setList(data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))))

    getData(res => {
      const dataNew = data.concat(res.results)
      setData(dataNew)
      setList(dataNew)
      setLoading(false)
    });
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
          marginBottom: '12px'
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <>
<List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  )
}

export default Index