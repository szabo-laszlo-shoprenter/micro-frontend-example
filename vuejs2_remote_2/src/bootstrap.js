import Vue from 'vue';
import RemoteApp from './AnotherRemoteApp.vue';

new Vue({
    render: h => h(RemoteApp),
}).$mount('#app');
