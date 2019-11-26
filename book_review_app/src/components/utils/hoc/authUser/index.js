import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Index(WrappedComponent) {
  return async (props) => {
    const auth = async () => {
      let result = false
      await axios({
        method: 'get',
        url: 'http://localhost:8080/reviewbook/current',

      }).then((res) => {
       result = res.data
      })
      return result
    }
    let user = await auth()
    if (user)
      return <WrappedComponent {...props} currentUser={user}/>
      return <Redirect to='/'/>
  }
}

export default Index