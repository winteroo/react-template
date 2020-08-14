import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { inject, observer } from 'mobx-react';
import './index.scss';

@inject('local')
@inject('login')
@observer
class Login extends React.Component {
  handleSubmit = e => {
    const { local, login, history, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        login.loginReq(values.username, values.password, history, local);
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名！' }]
            })(
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder='Username' size='large'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码！' }]
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                size='large'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' size='large' loading={this.props.login.loading} htmlType='submit' className='login-form-button'>
              Log in
            </Button>
            <a className='login-form-forgot' href=''>
              Forgot password
            </a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Login);
