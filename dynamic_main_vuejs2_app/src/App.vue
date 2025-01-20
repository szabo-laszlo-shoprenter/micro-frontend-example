<template>
  <div id="app">
    <h1>Hello Vue 2!</h1>

    <div v-if="error" style="color: red">
      Hiba történt: {{ error }}
    </div>

    <div v-else-if="loading">
      Loading remote app...
    </div>

    <component :is="RemoteComponent" v-else />
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
    };
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
