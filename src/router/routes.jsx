
import Loadable from 'react-loadable';
import Loading from '../components/loading/index';

function process (asyncComponent) {
  return Loadable({
    loader: asyncComponent,
    loading: Loading
  });
}

const Home = process(() => import(/* webpackChunkName: 'Home' */'../views/home/index'));
const Detail = process(() => import(/* webpackChunkName: 'Home' */'../views/detail/index'));

const routerConfig = [
  {
    path: '/app/home',
    component: Home,
    requireAuth: true,
    exact: true
  },
  {
    path: '/app/detail',
    component: Detail,
    requireAuth: true,
    exact: true
  }
];
export default routerConfig;
