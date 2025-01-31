<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
        src="https://picsum.photos/320/180"
        height="180px"
        cover
    ></v-img>

    <v-card-title>Ez itt a Remote 2 APP</v-card-title>

    <v-card-text>
      Üdv a második remote komponensből! Ez is külön betöltött app, saját
      megjelenéssel és funkciókkal.

      <div class="mt-3">
        <h6>Elérhető route-ok:</h6>
        <ul>
          <li v-for="route in routes" :key="route.path">{{ route.path }}</li>
        </ul>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="doSomething">
        Távoli gomb #2
      </v-btn>
    </v-card-actions>

    <v-alert
        v-if="showAlert"
        type="warning"
        dismissible
        class="mt-3"
        @input="hideAlert"
    >
      A második távoli komponens gombja is működik!
    </v-alert>
  </v-card>
</template>

<script>
export default {
  name: 'Vuetify2App',
  data() {
    return {
      routes: [],
      showAlert: false,
    };
  },
  mounted() {
    if (this.$router) {
      this.routes = this.$router.options.routes.map(route => ({ path: route.path }));
    }
    this.envVars = [];
  },
  methods: {
    doSomething() {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 4000);
    },
    hideAlert() {
      this.showAlert = false;
    },
  },
};
</script>

<style>
/* Itt lehet extra Vuetify stílusokat alkalmazni */
</style>
