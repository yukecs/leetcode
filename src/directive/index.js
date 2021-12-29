import Loading from './loading'
import MainLoading from './main-loading'
export default {
  install (Vue) {
    Vue.directive('loading', Loading)
    Vue.directive('main-loading', MainLoading)
  }
}