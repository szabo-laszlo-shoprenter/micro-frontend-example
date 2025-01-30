import Vue from 'vue';
import Router from 'vue-router';
import RemoteApp from '../RemoteApp.vue';  // Példa nézet

Vue.use(Router);

export default new Router({
    mode: 'history', // vagy 'hash' ha nem szeretnél history módot
    routes: [
        {
            path: '/',
            name: 'Home',
            component: RemoteApp
        },
    ]
});
