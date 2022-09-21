import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';


Vue.use(VueRouter)

/* A route configuration. */
const routes = [{
        path: '',
        redirect: '/auth',
    },
    {
        path: '/auth',
        component: () =>
            import ( /* webpackChunkName: "auth" */ '../views/auth/index.vue'),
        children: [{
                path: '/',
                redirect: 'login'
            },
            {
                path: 'login',
                name: 'login',
                meta: { requiresVisitor: true },
                component: () =>
                    import ( /* webpackChunkName: "login" */ '../views/auth/modules/login.vue'),
            },
        ]
    },
    {
        path: '/console',
        component: () =>
            import ( /* webpackChunkName: "admin" */ '../views/admin/index.vue'),
        children: [{
                path: '/',
                redirect: 'administrators'
            }, ,
            {
                path: 'administrators',
                name: 'administrators',
                meta: {
                    requiresAuth: true,
                    header_text: 'Administrators',
                },
                component: () =>
                    import ( /* webpackChunkName: "admin" */ '../views/admin/modules/admin.vue')
            },
            {
                path: 'stream-group',
                name: 'stream-group',
                meta: {
                    requiresAuth: true,
                    header_text: 'Stream Group',
                },
                component: () =>
                    import ( /* webpackChunkName: "stream-group" */ '../views/admin/modules/stream-group.vue')
            },
            {
                path: 'stream',
                name: 'stream',
                meta: {
                    requiresAuth: true,
                    header_text: 'Stream',
                },
                component: () =>
                    import ( /* webpackChunkName: "stream" */ '../views/admin/modules/stream.vue')
            },
            {
                path: 'domain',
                name: 'domain',
                meta: {
                    requiresAuth: true,
                    header_text: 'Domain',
                },
                component: () =>
                    import ( /* webpackChunkName: "domain" */ '../views/admin/modules/domain.vue')
            },
            {
                path: 'log',
                name: 'log',
                meta: {
                    requiresAuth: true,
                    header_text: 'Activity Log',
                },
                component: () =>
                    import ( /* webpackChunkName: "log" */ '../views/admin/modules/log.vue')
            },

            {
                path: 'users',
                name: 'users',
                meta: { requiresAuth: true },
                component: () =>
                    import ( /* webpackChunkName: "users" */ '../views/admin/modules/users.vue')
            },
            {
                path: '*',
                component: () =>
                    import ( /* webpackChunkName: "404" */ '../views/404.vue'),
                name: 'NotFound'
            }

        ]
    },
]


/* Creating a new instance of VueRouter and passing in the routes. */
const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})


const sg = store.getters
const restrictions = require('../restrictions')
const chkprofile = store.dispatch('auth/getProfile')

/**
 * It returns an array of strings that are the names of the pages that the user is allowed to access.
 * @param user_type - 1
 * @returns An array of objects.
 */
function getRestriction(user_type) {
    var access = []
    switch (user_type) {
        case 1:
            access = restrictions.masteradmin
            break
    }
    return access
}

router.beforeEach(async(to, from, next) => {
    var access = []
        /* Checking if the user is logged in or not. If the user is logged in, it checks if the user has
        access to the page. If the user is not logged in, it redirects the user to the login page. */
    if (await chkprofile && to.matched.some(record => record.meta.requiresAuth)) {
        if (!sg['auth/authenticated']) {
            next({ name: 'login' })
        } else {
            access = getRestriction(sg['auth/user_type'])
            if (!access.includes(to.name)) {
                next({ name: access[0] })
            } else {
                next()
            }
        }
    } else if (await chkprofile && to.matched.some(record => record.meta.requiresVisitor)) {
        if (sg['auth/authenticated']) {
            access = getRestriction(sg['auth/user_type'])
            next({ name: access[0] })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})


export default router