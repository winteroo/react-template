import axios from 'axios';
import qs from 'qs';
import eventProxy from '../util/event';
import NProgress from 'nprogress';

const service = axios.create();

service.interceptors.request.use(
  request => {
    NProgress.start();
    if (request.method === 'get') {
      request.headers['Cache-Control'] = 'no-cache';
      request.headers.Pragma = 'no-cache';
    }
    const token = sessionStorage.getItem('x-token');
    const auth = sessionStorage.getItem('auth');
    if (token) {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的headers都加上token，不用每次请求都手动添加了
      request.headers.token = token;
    }
    if (auth) {
      request.headers.auth = auth;
    }
    // 判断是否是表单提交数据，如果是则不转换字符串
    if (!request.headers.isFormData && request.headers.isFormData !== 'true') {
      request.data = qs.stringify(request.data);
    }
    return request;
  },
  err => {
    return Promise.reject(err);
  });

service.interceptors.response.use(
  response => {
    NProgress.done();
    if (response.status !== 200) {
      eventProxy.$emit('serviceError');
    } else {
      const code = response.data.errCode;
      switch (code) {
        // 登录过期
        case 10023:
          eventProxy.$emit('loginExpired');
          return response.data;
        // 服务器内部错误
        case -1:
          eventProxy.$emit('serviceError');
          return response.data;
        // 异地登录
        case 10027:
          eventProxy.$emit('remoteLogin');
          return response.data;
        default:
          return response.data;
      }
    }
  }
);

export default service;
