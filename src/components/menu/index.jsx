import React from 'react';
import { Menu, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import eventProxy from '../../util/event';

const { SubMenu } = Menu;
@inject('local')
@observer
class XrdMenu extends React.Component {
  constructor () {
    super();
    this.state = {
      timer: null
    };
  }

  goMenu (e) {
    console.log(e);
    const { local, history } = this.props;
    local.setActiveMenu(e.key);
    local.setKeyPath(e.keyPath);
    history.push(e.key);
  }

  componentDidMount () {
    const { history, location } = this.props;
    // 登录过期,重新登录
    eventProxy.$on('loginExpired', () => {
      history.push({ pathname: '/loginTimeout' });
    });
    // 服务器内部错误
    eventProxy.$on('serviceError', () => {
      history.push({ pathname: '/serviceError' });
    });
    // 异地登录
    eventProxy.$on('remoteLogin', () => {
      if (this.state.timer) {
        clearTimeout(this.state.timer);
      }
      const timer = setTimeout(() => {
        if (location.pathname !== '/login') {
          history.push({
            pathname: '/login'
          });
        }
      }, 300);
      this.setState({
        timer
      });
    });
  }

  recursion (menuSource) {
    return (
      menuSource.map(menu => {
        if (menu.children) {
          return (
            <SubMenu
              key={menu.router}
              title={
                <span>
                  {
                    menu.icon ? <Icon type={menu.icon} /> : ''
                  }
                  {menu.label}
                </span>
              }
            >
              {this.recursion(menu.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={menu.router}>
              {
                menu.icon ? <Icon type={menu.icon} /> : ''
              }
              {menu.label}
            </Menu.Item>
          );
        }
      })
    );
  }

  render () {
    const { local } = this.props;
    return (
      <Menu
        mode='inline'
        onClick={(e) => this.goMenu(e)}
        defaultOpenKeys={local.menuPath.slice()}
        selectedKeys={local.activeMenu.slice()}
        style={{ height: '100%', borderRight: 0 }}
      >
        {this.recursion(local.menuConfig.slice())}
      </Menu>
    );
  }
}

export default XrdMenu;
