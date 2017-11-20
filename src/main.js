import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VeeValidate from 'vee-validate';
import Meta from 'vue-meta'
import WebFont from 'webfontloader'
import VueClipboard from 'vue-clipboard2'
import VueAnalytics from 'vue-analytics'

import App from './App'
import router from './router'

Vue.use(VueAnalytics, {
    id: 'UA-108383158-1',
    router,
    ignoreRoutes: ['beanman']
});

Vue.router = router;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.API_BASE || "https://api.screenhole.net";

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
        redirect: '/',
        url: '/users/token'
    },
    refreshData: {
        url: '/users/token/refresh'
    },
    fetchData: {
        url: '/users/current'
    },
    registerData: {
        redirect: '/',
        url: '/users'
    },
    parseUserData: function (data) {
        return data.user;
    },
    auth: knockAuth,
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
});

Vue.use(Meta);

Vue.use(VueClipboard);

Vue.use(VeeValidate);

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
