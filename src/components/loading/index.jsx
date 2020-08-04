import React from 'react';
import { Spin } from 'antd';
import './index.scss';

const Loading = () => {
  return (
    <div className='loading'>
      <Spin />
    </div>
  );
};

export default Loading;
