import local from './local';
import login from '../views/login/state';
import home from '../views/home/state';
import detail from '../views/detail/state';
import { configure } from 'mobx'; // 开启严格模式

configure({ enforceActions: 'observed' }); // 开启严格模式

export default {
  home,
  local,
  login,
  detail
};
