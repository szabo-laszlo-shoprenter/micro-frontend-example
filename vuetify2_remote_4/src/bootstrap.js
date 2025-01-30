import Vue from 'vue';
import Vuetify2App from './Vuetify2App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'; // Vuetify alapértelmezett stílusai

Vue.use(Vuetify);

new Vue({
    vuetify: new Vuetify(),
    router,
    render: h => h(Vuetify2App),
}).$mount('#app');
