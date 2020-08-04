import { action, observable } from 'mobx';
import api from '@/api';
import { message } from 'antd';
import md5 from 'js-md5';

class Login {
  @observable username = '';
  @observable password = '';
  @observable loading = false;

  @action
  async loginReq (u, p, router, local) {
    this.username = u;
    this.password = p;
    const params = {
      loginName: u.trim(),
      password: md5(p.trim().toLowerCase())
    };
    this.changeLoading(true);
    try {
      const res = await api.login(params);
      if (res.errCode === 0) {
        message.success('登录成功！');
        local.setToken(res.data.token);
        local.setInfo(u, p);
        local.initMenu();
        local.setActiveMenu('/app/home');
        router.push('/app/home');
      } else {
        message.error(res.msg);
      }
      this.changeLoading(false);
    } catch (err) {
      this.changeLoading(false);
    }
  }

  @action
  changeLoading (flag) {
    this.loading = flag;
  }
}

const login = new Login();

export default login;
