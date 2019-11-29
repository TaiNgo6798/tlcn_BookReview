import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { routers } from './configs'
import './App.css'


const App = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            {routers.map((route, idx) => (
              <Route
                key={idx}
                exact={route.exact}
                path={route.path}
                render={() => {
                  const Component = React.lazy(() => import(`./pages/${route.component}`))
                  return <Component />
                }}
              />
            ))}
            <Redirect to='/' />
          </Switch>
        </Router>
    </Suspense>
  );
}

export default App
