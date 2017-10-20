import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueHead from 'vue-head'
import WebFont from 'webfontloader'
import VueClipboard from 'vue-clipboard2'
import VueAnalytics from 'vue-analytics'

import App from './App'
import router from './router'

Vue.use(VueAnalytics, {
    id: 'UA-108383158-1',
    router,
})

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

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
