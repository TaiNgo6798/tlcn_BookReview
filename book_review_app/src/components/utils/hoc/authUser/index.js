import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Index(WrappedComponent) {
  return (props) => {
    const auth = async () => {
      let result = false
      await axios({
        method: 'get',
        url: 'http://localhost:8080/reviewbook/current',

      }).then(() => {
       result = true
      })
      return result
    }
   
    if (auth())
      return <WrappedComponent {...props} />
      return <Redirect to='/'/>
  }
}

export default Index