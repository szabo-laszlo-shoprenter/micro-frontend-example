import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/coupon/list'
        },
        {
            path: '/coupon',
            component: () => import('../components/CouponMFApp.vue'),
            children: [
                {
                    path: '',
                    redirect: 'list'
                },
                {
                    path: 'list',
                    name: 'List',
                    component: () => import('../components/CouponList.vue')
                },
                {
                    path: 'new',
                    name: 'New',
                    component: () => import('../components/CouponForm.vue')
                }
            ]
        }
    ]
});
