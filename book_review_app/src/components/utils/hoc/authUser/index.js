import React, { Component } from 'react'
import axios from 'axios'


function withAuth(WrappedComponent) {
  return class index extends Component {
    constructor(props) {
      super(props);
      this.state = {
        logged: false
      }
    }
    componentDidMount() {
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : 'shittoken'
      axios({
        method: 'POST',
        url: `http://localhost:8080/reviewbook/current?token=${token}`
      }).then(() => {
        this.setState({
          logged: true
        })
      }).catch(() => {
        this.setState({
          logged: false
        })
      })
    }
    render() {
      return this.state.logged && <WrappedComponent {...this.props} />
    }
  }
}


export default withAuth

