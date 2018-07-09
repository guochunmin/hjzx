// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import utils from './vue.extend'
import touch from './vue.event'
import axios from "axios"
import jq from "jquery"
Vue.prototype.$http=axios;
Vue.prototype.$jq=jq;
Vue.use(utils);
touch(Vue);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
