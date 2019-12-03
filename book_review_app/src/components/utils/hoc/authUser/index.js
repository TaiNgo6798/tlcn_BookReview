import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


function withAuth(WrappedComponent) {
  return class index extends Component {
    constructor(props) {
      super(props)
      this.state = {
         user: null
      }
    }
  
    render() {
      return  <WrappedComponent {...this.props} currentUser={this.state.user}/>
    }
  }
}


export default withAuth

