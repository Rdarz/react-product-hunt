import React from 'react';

import {
  Route,
  Switch,
  withRouter
  // Redirect
} from 'react-router-dom';
import routesList from './routes/createRoutes';

class App extends React.Component {
  state = {
    error: false
  };

  async componentDidCatch(error, errorInfo) {
    try {
      console.log('process.env.NODE_ENV', error, errorInfo);
    } catch (e) {
      console.log('Exception error', e, error);
    }
  }

  render() {
    return (
      <Switch>
        {routesList.map((route, index) => (
          <Route
            exact={route.exactPath || false}
            path={route.path}
            component={route.component}
            key={index}
          />
        ))}
        {/*
              <Redirect path='*' to='/pagenotfound' />
            */}
      </Switch>
    );
  }
}
export default withRouter(App);
