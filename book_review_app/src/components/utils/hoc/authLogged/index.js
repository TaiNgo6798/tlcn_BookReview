import React, { Component } from 'react'
import axios from 'axios'


function withAuthLogged(WrappedComponent) {
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
      }).then((res) => {
        if(res.data.success === false){
          this.setState({
            logged: false
          })
        } else {
          this.setState({
            logged: true
          })
        }
      })
    }
    render() {
      return this.state.logged && <WrappedComponent {...this.props} />
    }
  }
}


export default withAuthLogged
