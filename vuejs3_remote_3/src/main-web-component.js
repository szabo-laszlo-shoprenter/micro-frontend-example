/**
 * src/main-ce.js
 *
 * Ezt az entry pointot kizárólag arra használjuk,
 * hogy legyártsunk és regisztráljunk egy custom elementet.
 */
import { defineCustomElement } from 'vue'
import MyVue3App from './VueJS3App.vue'

// A defineCustomElement visszaad egy Web Component konstruktort
const MyVue3WebComponent = defineCustomElement(MyVue3App)

// Regisztráljuk a böngészőben
customElements.define('my-vue3-element', MyVue3WebComponent)

// Ha szeretnél valamit exportálni is (például, hogy a host
// import() utáni then-ben tudja, hogy betöltődött), akár:
export default MyVue3WebComponent
