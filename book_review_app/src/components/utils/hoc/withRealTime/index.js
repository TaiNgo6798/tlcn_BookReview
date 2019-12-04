import React, { Component } from 'react'
import firebase from "firebase"

function withRealTime(WrappedComponent, idPost) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        id: idPost
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
     
    }

    componentWillUnmount() {
      
    }

    handleChange() {

    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      console.log('alo')
      return <WrappedComponent  {...this.props} />;
    }
  };
}

export default withRealTime
