import Vue from 'vue'
import Router from 'vue-router'
import Stream from '@/components/Stream'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Settings from '@/components/Settings'
import Wtf from '@/components/Wtf'
import EULA from '@/components/EULA'
import Privacy from '@/components/Privacy'
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

        // require IS NOT logged in (auth: false)
        { path: '/login', component: Login, meta: { auth: false } },
        { path: '/register', component: Register, meta: { auth: false } },

        // require IS logged in (auth: true)
        { path: '/settings', component: Settings, meta: { auth: true } },

        // unauthenticated
        { path: '/~beanman', component: Beanman, name: 'beanman' },
        { path: '/wtf', component: Wtf },
        { path: '/eula', component: EULA },
        { path: '/privacy', component: Privacy },
        { path: '/:username', name: 'user-stream', component: UserStream },
        { path: '/:username/~:grab_id', name: 'grab-permalink', component: GrabPermalink },
        { path: '*', component: NotFound },
    ]
})
