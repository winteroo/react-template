import React from 'react';
import { Layout } from 'antd';
import XrdMenu from '../menu';
import { withRouter } from 'react-router-dom';
import LayoutRouter from '../../router/layoutRoutes';
import MyHeader from '@/views/header/index';

const { Header, Content, Sider } = Layout;

@withRouter
class Main extends React.Component {
  render () {
    return (
      <Layout className='layout'>
        <Header className='header'>
          <MyHeader {...this.props} />
        </Header>
        <Layout className='main'>
          <Sider width={200} className='silde-menu'>
            <XrdMenu {...this.props} />
          </Sider>
          <Layout className='main-right'>
            <Content className='content'>
              <LayoutRouter />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
