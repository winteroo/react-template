import React from 'react';
import { Menu, Dropdown, Icon, Avatar, Modal } from 'antd';

import './index.scss';

class MyHeader extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  logout () {
    const { history } = this.props;
    const vm = this;
    Modal.confirm({
      title: '提示',
      content: '确定退出系统吗？',
      okText: '确认',
      cancelText: '取消',
      onOk () {
        return new Promise((resolve, reject) => {
          vm.clearStore();
          resolve();
          setTimeout(() => {
            history.replace({
              pathname: '/login'
            });
          }, 300);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel () {}
    });
  }

  clearStore () {
    sessionStorage.clear();
  }

  render () {
    const menu = (
      <Menu>
        <Menu.Item key='0' onClick={() => this.showModal()}>
          <span>
            个人信息
          </span>
        </Menu.Item>
        <Menu.Item key='1' onClick={() => this.logout()}>
          <span>
            退出
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='my-header'>
        <div className='header-left'>
          <div className='header-img'>
            <img src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K' alt='' />
          </div>
          <div className='header-title'>欢迎访问React中台系统</div>
        </div>
        <div className='header-info'>
          <div className='info'>admin</div>
          <div className='tool'>
            <Dropdown overlay={menu}>
              <span className='tool-span'>
                <Avatar size={32} icon='user' />
                &nbsp;&nbsp;
                <Icon type='down' />
              </span>
            </Dropdown>
            <Modal
              title='个人信息'
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default MyHeader;
