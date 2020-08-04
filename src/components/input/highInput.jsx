import React from 'react';
import MyInput from './index';

class HighInput extends React.Component {
  render () {
    const inputProp = {
      value: this.props.value,
      handleInput: this.props.handleInput
    };
    return (
      <div>
        <div>
          <MyInput {...inputProp} />
        </div>
      </div>
    );
  }
}

export default HighInput;
