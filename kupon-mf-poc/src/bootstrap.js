import Vue from 'vue';
import App from './components/CouponMFApp.vue';
import router from './router';
import oauthManager from "./oauthManager/oauthManger";

// A routerben definiált route-ok exportálása a komponenshez
App.routes = router.options.routes;

Vue.prototype.$oauthManager = oauthManager

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

export default App;
