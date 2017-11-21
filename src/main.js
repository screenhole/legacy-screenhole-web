import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VeeValidate from 'vee-validate';
import WebFont from 'webfontloader'
import VueAnalytics from 'vue-analytics'

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
    .config('https://3cfc1d4e9157428b91990b4450b240c6@sentry.io/248084')
    .addPlugin(RavenVue, Vue)
    .install();

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

// catch 401 errors and logout
Vue.axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
        console.log('401, invalid token. logging out')
        Vue.auth.logout();
        return Promise.resolve(error);
    }

    console.log('second', error)

    return Promise.reject(error);
});

(function(request, next) {
    next(function (res) {
        if (res.status === 401) {
            Vue.auth.logout();
        }
    });
});

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
