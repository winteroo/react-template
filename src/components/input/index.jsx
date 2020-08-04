import React from 'react';
import { Input } from 'antd';

class MyInput extends React.Component {
  render () {
    return (
      <div>
        <Input value={this.props.value} onInput={(e) => this.props.handleInput(e)} size='large' placeholder='large size' />
      </div>
    );
  }
}

export default MyInput;
