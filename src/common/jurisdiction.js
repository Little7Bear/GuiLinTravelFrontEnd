import store from '@/store';

export function checkJurisdiction(key) {
  let user = localStorage.getItem('user')

  if (user) {
    user = JSON.parse(user)

    /* 0：管理员；1：注册用户；2：游客； */
    if (user.status <= parseInt(key)) {
      // 有权限
      return true
    } else {
      // 无权限
      return false
    }
  } else {
    return false
  }
}