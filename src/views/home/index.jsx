import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Table } from 'antd';
import './index.scss';

@inject('home')
@inject('local')
@observer
class Home extends React.Component {
  change () {
    const { history, local } = this.props;
    history.push('/app/detail');
    local.setActiveMenu('/app/detail');
    local.setKeyPath(['/app/detail', '/detail']);
  }

  render () {
    const { home, local } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        home.changeSelectKyes(selectedRowKeys);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled',
        name: record.name
      }),
      selectedRowKeys: home.selectedRowKeys
    };
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        fixed: true,
        width: 400,
        render: text => <a>{text}</a>
      },
      {
        title: 'Age',
        dataIndex: 'age'
      },
      {
        title: 'Address',
        dataIndex: 'address'
      }
    ];
    return (
      <div className='home'>
        <h2>username: {local.userName}</h2>
        <h2>password: {local.passWord}</h2>
        <h2>token: {local.token}</h2>
        <Button type='primary' onClick={() => home.changUser()}>点我改变</Button>
        <Button type='primary' onClick={() => this.change()}>点我去详情</Button>
        <Table x rowSelection={rowSelection} columns={columns} dataSource={home.data.slice()} />
      </div>
    );
  }
}

export default Home;
