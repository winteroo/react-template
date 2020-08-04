import URL from '@/api/URL';
import fetch from '@/api/fetch';

export function login (params) {
  // return fetch.post(URL.login, params);
  const obj = {
    errCode: 0,
    data: {
      token: 'DFG664FDS5GSSDFD'
    },
    msg: '成功'
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(obj);
    }, 1000);
  });
}

export function logout (params) {
  return fetch.post(URL.logout, params);
}
