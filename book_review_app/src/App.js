import React, { Suspense } from 'react';
import './App.css'
import AppRouters from './Router'
import NavBar from './components/nav'
import Chatbar from './components/chatBar'
import Login from '../src/pages/login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const path = window.location.pathname

const App = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Chatbar />
          <NavBar />
          <AppRouters />
        </Router>
      </Suspense>
    </>
  );
}

export default App
