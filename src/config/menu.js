export const menu = [{
  router: '/app/home',
  label: '首页',
  icon: 'home'
}, {
  router: '/detail',
  label: '管理',
  icon: 'reddit',
  children: [{
    router: '/app/detail',
    label: '详情'
  }]
}];
