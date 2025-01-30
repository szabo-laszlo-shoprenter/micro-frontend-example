import Vue from 'vue';
import RemoteApp from './RemoteApp.vue';
import router from './router';

new Vue({
    router,
    render: h => h(RemoteApp),
}).$mount('#app');
