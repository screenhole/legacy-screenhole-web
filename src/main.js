import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import WebFont from 'webfontloader'

import App from './App'
import router from './router'

Vue.use(require('vue-analytics'), {
    id: 'UA-108383158-1',
    router,
    ignoreRoutes: ['beanman']
});

Vue.router = router;

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.API_BASE || "https://api.screenhole.net";

import ActionCable from 'actioncable'
Vue.prototype.$cable = ActionCable.createConsumer(Vue.axios.defaults.baseURL.replace('http', 'ws') + '/cable')

import anime from 'animejs'
Vue.prototype.$anime = anime

import lottie from 'lottie-web'
Vue.prototype.$lottie = lottie

import interact from 'interactjs'
Vue.prototype.$interact = interact

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

import MQ from 'vue-match-media/dist'
Vue.use(MQ)

Vue.use(require('vee-validate'))
Vue.use(require('vue-shortkey'), { prevent: ['input', 'textarea'] })

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
    mq: {
        mobile: '(max-width: 980px)',
    },
    components: {
        App
    }
});
