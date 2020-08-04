import React from 'react';
import HighInput from '../../components/input/highInput';
import { inject, observer } from 'mobx-react';

@inject('detail')
@observer
class Detail extends React.Component {
  render () {
    const inputProp = {
      value: this.props.detail.value,
      handleInput: (e) => {
        this.props.detail.changeVal(e.target.value);
      }
    };
    return (
      <div>
        <p>detail</p>
        <div>
          <HighInput {...inputProp} />
          <h2>{this.props.detail.value}</h2>
        </div>
      </div>
    );
  }
}

export default Detail;
