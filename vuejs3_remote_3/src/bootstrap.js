import { createApp } from 'vue'
import VueJS3App from './VueJS3App.vue'

// 1) Vuetify 3 importok
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 2) Vuetify példány (plugin) létrehozása
const vuetify = createVuetify({
    components,
    directives,
    // Ha szükséges, itt állíthatsz be ikonokat, témát, stb.
    // pl.: theme: { defaultTheme: 'dark' }
})

// 3) A Vue alkalmazás létrehozása, és a Vuetify plugin használata
createApp(VueJS3App)
    .use(vuetify)
    .mount('#app')
