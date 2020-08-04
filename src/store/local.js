import {
  observable,
  action,
  extendObservable
} from 'mobx';
import { menu } from '../config/menu';

/**
 * 存储需要持久化的数据
 * 例如 token等
 * 这里面的数据会在界面刷新时将数据存放在sessionStorage
 * 项目重新加载是首先从sessionStorage中读取数据初始化
 */
class Local {
  @observable token = '';
  @observable menuConfig = [];
  @observable activeMenu = [];
  @observable menuPath = [];
  @observable userName = '';
  @observable passWord = '';

  @action
  setToken (token) {
    this.token = token;
    sessionStorage.setItem('x-token', this.token);
  }

  @action
  setInfo (userName, pwd) {
    this.userName = userName;
    this.passWord = pwd;
  }

  @action
  initStore () {
    if (sessionStorage.getItem('store')) {
      const stores = JSON.parse(sessionStorage.getItem('store'));
      extendObservable(this, stores);
    }
  }

  @action
  initMenu () {
    this.menuConfig = menu;
  }

  @action
  setActiveMenu (path) {
    this.activeMenu[0] = path;
  }

  @action
  setKeyPath (pathArr) {
    this.menuPath = pathArr;
  }
}

const local = new Local();

export default local;
