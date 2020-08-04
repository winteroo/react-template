
/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import routeConfig from './routes.jsx';

class LayoutRouter extends React.Component {
  renderRoutes (routes, extraProps = {}, switchProps = {}) {
    return routes ? (
      <Switch {...switchProps}>
        {routes.map((route, i) => (
          <Route
            exact={route.exact}
            key={route.key || i}
            path={route.path}
            render={props => {
              if (route.render) {
                return route.render({ ...props, ...extraProps, route: route });
              } else {
                if (route.requireAuth) {
                  if (sessionStorage.getItem('x-token')) {
                    return <route.component
                      {...props}
                      {...extraProps}
                      route={route}
                    />;
                  } else {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
                  }
                } else {
                  return <route.component
                    {...props}
                    {...extraProps}
                    route={route}
                  />;
                }
              }
            }}
            strict={route.strict}
          />
        ))}
      </Switch>
    ) : null;
  }

  render () {
    return (
      <HashRouter>
        {this.renderRoutes(routeConfig)}
      </HashRouter>
    );
  }
}

export default LayoutRouter;
