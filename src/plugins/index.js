import lodash from 'lodash'
import dayjs from 'dayjs'
import { checkJurisdiction } from '../common/jurisdiction'

export default {
  install(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.prototype.$dayjs = dayjs
    Vue.prototype.$_ = lodash

    // 2. 添加全局资源
    Vue.directive('permission', {
      inserted(el, binding) {// inserted → 元素插入的时候
        let permission = binding.value // 获取到 v-permission的值

        if (permission) {
          let hasPermission = checkJurisdiction(permission)
          if (!hasPermission) {
            // 没有权限 移除Dom元素
            el.parentNode && el.parentNode.removeChild(el)
          }
        } else {
          throw new Error('需要传key')
        }
      }
    })
  },
}