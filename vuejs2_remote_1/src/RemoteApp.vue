<template>
  <div class="card mx-auto" style="width: 18rem;">
    <img
        src="https://picsum.photos/300/200"
        class="card-img-top"
        alt="Random image"
    />
    <div class="card-body">
      <h5 class="card-title">Ez itt a Remote 1 APP</h5>
      <p class="card-text">
        Üdv a remote komponensből! Itt be tudsz tenni bármilyen
        dinamikus adatot, amit a remote app szolgáltat.
      </p>
      <button @click="doSomething" class="btn btn-primary">
        Távoli gomb
      </button>

      <div v-if="showAlert" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        Távoli komponens gombja is működik!
        <button type="button" class="close" aria-label="Close" @click="hideAlert">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="mt-3">
        <h6>Elérhető route-ok:</h6>
        <ul>
          <li v-for="route in routes" :key="route.path">{{ route.path }}</li>
        </ul>
      </div>

      <div class="mt-3">
        <h6>Környezet változók:</h6>
        <ul>
          <li v-for="(value, key) in envVars" :key="key">{{ key }}: {{ value }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Router from 'vue-router';

export default {
  name: 'RemoteApp',
  data() {
    return {
      showAlert: false,
      routes: [],
      envVars: {}
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
      }, 3000);
    },
    hideAlert() {
      this.showAlert = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
