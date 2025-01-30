<template>
  <!--
    A Vuetify-ban a 'v-card', 'v-img', 'v-btn', 'v-alert' stb. komponensekkel
    helyettesíthetjük a bootstrap-es elemeket.
  -->
  <v-card class="mx-auto ma-5" max-width="400">
    <!-- Kép -->
    <v-img
        src="https://picsum.photos/320/180"
        height="180"
        alt="Random image"
    />

    <!-- Cím és szöveg -->
    <v-card-title>Ez itt a Remote 3 VueJS 3 APP</v-card-title>
    <v-card-text>
      Üdv a harmadik remote komponensből! Ez is külön betöltött app,
      saját megjelenéssel és funkciókkal.
    </v-card-text>

    <!-- A prop kiírása -->
    <v-card-subtitle>
      PROPS ami a host-ból jön: {{ productData }}
    </v-card-subtitle>

    <!-- Gomb és eseménykezelés -->
    <v-card-actions>
      <v-btn color="error" @click="doSomething">
        Távoli gomb #2
      </v-btn>
    </v-card-actions>

    <!-- Figyelmeztető üzenet (alert) -->
    <v-alert
        v-if="showAlert"
        type="warning"
        class="ma-3"
        dismissible
        @click:close="hideAlert"
    >
      A második távoli komponens gombja is működik!
    </v-alert>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

// A host alkalmazásból kapott adat (props)
const props = defineProps({
  productData: {
    type: Object,
    default: () => ({})
  }
})

// Megjelenjen-e a figyelmeztetés?
const showAlert = ref(false)

// Gombnyomáskor aktiválódik az alert, majd 4 mp múlva eltűnik
function doSomething() {
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 4000)
}

// A felhasználó manuálisan is bezárhatja az alertet
function hideAlert() {
  showAlert.value = false
}
</script>

<style scoped>
/* Komponens-specifikus stílusokat ide írhatsz, ha szükséges. */
</style>
