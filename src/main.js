import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VueHead from 'vue-head'
import WebFont from 'webfontloader'
import VueClipboard from 'vue-clipboard2'

import App from './App'
import router from './router'

Vue.router = router;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

var knockAuth = {
    request: function (req, token) {
        this.options.http._setHeaders.call(this, req, {Authorization: 'Bearer ' + token});
    },
    
    response: function (res) {
        return res.data == null ? null : res.data.jwt;
    }
};

Vue.use(VueAuth, {
    loginData: {
        url: '/users/token'
    },
    refreshData: {
        url: '/users/token/refresh'
    },
    fetchData: {
        url: '/users/current'
    },
    registerData: {
        url: '/users'
    },
    auth: knockAuth,
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
});

Vue.axios.defaults.baseURL = process.env.API_BASE || "https://api.screenhole.net";

Vue.use(VueHead);
Vue.use(VueClipboard);

WebFont.load({
    google: {
        families: ['Poppins:400,700']
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});
