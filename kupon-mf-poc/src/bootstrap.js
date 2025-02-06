import Vue from 'vue';
import App from './components/CouponMFApp.vue';
import router from './router';

// A routerben definiált route-ok exportálása a komponenshez
App.routes = router.options.routes;

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

export default App;
