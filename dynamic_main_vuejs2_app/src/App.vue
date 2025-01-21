<template>
  <div id="app" class="container py-5">
    <!-- Számláló UI bootstrap-esztétikával -->
    <div class="row justify-content-center mb-3">
      <div class="col-auto">
        <h2>Count: {{ count }}, arra az esetre hogy műxik-e még a JS</h2>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div class="col-auto">
        <button class="btn btn-primary" @click="incrementCount">
          Növel
        </button>
      </div>
    </div>


    <div class="card">
      <div class="card-header">
        Itt lesznek a REMOTE APP-ok ebben a card-ban
      </div>
      <div class="card-body">
        <!-- Hibaüzenet -->
        <div v-if="error" class="alert alert-danger" role="alert">
          Hiba történt: {{ error }}
        </div>
        <!-- Töltés -->
        <div v-else-if="loading" class="alert alert-info" role="alert">
          Loading remote app...
        </div>
        <component :is="RemoteComponent" v-else />
      </div>
    </div>
    <!-- Remote komponens -->
  </div>
</template>


<script>
import { loadRemote } from './loadRemote.js';

export default {
  name: 'App',
  data() {
    return {
      loading: true,
      error: null,
      RemoteComponent: null,
      count: 0,
    };
  },
  methods: {
    incrementCount() {
      this.count++;
    },
  },
  async mounted() {
    try {
      // 1. Lekérjük a remotek konfigurációját:
      const response = await fetch('/remotes.json');
      const remotes = await response.json();

      // 2. Tegyük fel, hogy a "remoteApp" kulcsú bejegyzés érdekel:
      const { url, scope, module } = remotes.remoteApp;

      // 3. Betöltjük magát a remote scriptet futásidőben:
      const container = await loadRemote(url, scope);

      // 4. A container.get(...) segítségével lekérjük a kívánt modult
      const factory = await container.get(module);
      // factory() meghívás után kapjuk a valódi exported modult
      const remoteModule = factory();

      // 5. Ha a remote modul Vue komponensként `export default ...`-ot ad vissza,
      // akkor a .default lesz a komponens:
      this.RemoteComponent = remoteModule.default ?? remoteModule;
    } catch (err) {
      this.error = err.toString();
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
