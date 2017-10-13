import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = process.env.API_BASE || 'https://api.screenhole.net';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
