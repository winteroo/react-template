import {
  observable,
  action
} from 'mobx';

class Detail {
  @observable value = 'mobx';

  @action
  changeVal (val) {
    this.value = val;
  }
}

const detail = new Detail();

export default detail;
