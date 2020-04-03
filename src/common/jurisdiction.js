import store from '@/store';

export function checkJurisdiction(key) {
  if (store.getters.getUser) {
    let user = JSON.parse(store.getters.getUser)
    /* 0：管理员；1：注册用户；2：游客； */
    if (user.status <= parseInt(key)) {
      // 有权限
      return true
    } else {
      // 无权限
      return false
    }
  }
}