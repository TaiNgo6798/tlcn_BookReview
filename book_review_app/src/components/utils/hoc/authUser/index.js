import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


function withAuth(WrappedComponent) {
  return class index extends Component {
    
    render() {
      return  <WrappedComponent {...this.props} />
    }
  }
}


export default withAuth

