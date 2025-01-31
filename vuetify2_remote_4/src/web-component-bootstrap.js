/**
 * src/main-ce.js
 *
 * Web Component létrehozása Vue 2 és Vuetify 2 segítségével.
 */

// 1) Vue 2 importálása
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import router from './router';

// 2) A "vue-custom-element" csomag importálása
import vueCustomElement from 'vue-custom-element'

// 3) A fő Vue komponens importálása (amit webkomponenssé alakítunk)
import MyVue2App from './Vuetify2App.vue'

// 4) Vuetify inicializálása
Vue.use(Vuetify)

// 5) A "vue-custom-element" regisztrálása Vue-hoz
Vue.use(vueCustomElement)

// 6) Egy ideiglenes Vue példány létrehozása
const vuetify = new Vuetify()

// 7) A Vue 2 komponenst webkomponenssé alakítjuk
Vue.customElement('my-vue2-element', {
    router: router,
    extends: MyVue2App,
    vuetify
})

