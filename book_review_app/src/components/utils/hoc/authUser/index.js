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

      componentDidMount() {
         axios({
        method: 'get',
        url: 'http://localhost:8080/reviewbook/current',
  
      }).then((res) => {
          this.setState({
            user : res.data
          })
      })
    }
  
    render() {

      return  <WrappedComponent {...this.props} currentUser={this.state.user}/>
    }
  }
}


export default withAuth

