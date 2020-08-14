import React from 'react';
import MyRouter from './router/index';
import { inject, observer } from 'mobx-react';
import stores from './store/local';

import './style/main.scss';

@inject('local')
@observer
class App extends React.Component {
  initLocalStore () {
    const { local } = this.props;
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      local.initStore();
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(stores));
    });
  }

  render () {
    this.initLocalStore();
    return (
      <div className='app'>
        <MyRouter />
      </div>
    );
  }
}

export default App;
