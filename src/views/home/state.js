import {
  observable,
  action
} from 'mobx';

class Home {
  @observable selectedRowKeys = ['1', '2'];
  @observable data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      key: '4',
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park'
    }
  ]

  @action
  changUser () {
    this.data.push({
      key: Math.random().toString(),
      name: 'Disabled User',
      age: 99,
      address: 'Sidney No. 1 Lake Park'
    });
  }

  @action
  changeSelectKyes (keys) {
    this.selectedRowKeys = keys;
    console.log(this.selectedRowKeys.slice());
  }
}

const home = new Home();

export default home;
