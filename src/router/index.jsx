import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../components/loading/index';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

function process (asyncComponent) {
  return Loadable({
    loader: asyncComponent,
    loading: Loading
  });
}

const Login = process(() => import(/* webpackChunkName: 'login' */'../views/login/index'));
const Main = process(() => import(/* webpackChunkName: 'layout' */'../components/layout/index'));

class MyRouter extends React.Component {
  componentDidMount () {
    console.log(this.props);
  }

  render () {
    return (
      <div className='layout'>
        <HashRouter>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route path='/app' component={Main} />
            <Redirect path='/*' to='/login' />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default MyRouter;
