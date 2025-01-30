/**
 * src/main-ce.js
 *
 * Ezt az entry pointot kizárólag arra használjuk,
 * hogy legyártsunk és regisztráljunk egy custom elementet.
 */

// 1) A Vue és a saját .vue komponens importja
import { createApp, defineCustomElement } from 'vue'
import MyVue3App from './VueJS3App.vue'

// 2) Vuetify 3 importok + alapvető beállítás
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 3) Készítünk egy ideiglenes appot, abba betöltjük a Vuetify plugint
const tempApp = createApp({})
const vuetify = createVuetify({
    components,
    directives,
    // Ide jöhetnek pl. theme, icons beállítások is
})
tempApp.use(vuetify)

// 4) Létrehozzuk a custom element konstruktorát a .vue komponensből
//    Az extra opciók között csak a shadow DOM-ot adjuk meg (ha szükséges).
const MyVue3WebComponent = defineCustomElement(tempApp, {
    shadow: { mode: 'open' },
})

// 5) A plugin (Vuetify) kontextust ráklónozzuk a webkomponens konstruktorra
//    Így a komponens belseje is “látja” a plugin regisztrált szolgáltatásait.
MyVue3WebComponent.prototype.appContext = tempApp._context

// 6) A böngészőben regisztráljuk a webkomponenst
customElements.define('my-vue3-element', MyVue3WebComponent)

// 7) Opcionális export, ha szükséges máshol hivatkozni rá
export default MyVue3WebComponent
