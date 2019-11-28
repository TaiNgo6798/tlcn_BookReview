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
    
     async componentDidMount() {
        await axios({
        method: 'get',
        url: 'http://localhost:8080/reviewbook/current',
  
      }).then((res) => {
          this.setState({
            user : res.data
          })
      })
    }

    componentWillUnmount() {
      this.setState({
        user: false
      })
    }
    
  
    render() {
      if(!!this.state.user)
      return  <WrappedComponent {...this.props} currentUser = {this.state.user}/>
      else return <Redirect to='/' />
    }
  }
}


export default withAuth

