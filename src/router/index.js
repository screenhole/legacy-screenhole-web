import Vue from 'vue'
import Router from 'vue-router'
import Stream from '@/components/Stream'
import Login from '@/components/Login'
import UserStream from '@/components/UserStream'
import GrabPermalink from '@/components/GrabPermalink'
import Beanman from '@/components/Beanman'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // higher on list = higher priority route (aka first match wins)
        { path: '/', component: Stream },
        { path: '/login', component: Login },
        { path: '/~beanman', component: Beanman},
        { path: '/:username', name: 'user-stream', component: UserStream },
        { path: '/:username/~:grab_id', name: 'grab-permalink', component: GrabPermalink },
        { path: '*', component: NotFound },
    ]
})
