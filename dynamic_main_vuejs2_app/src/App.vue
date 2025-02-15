<template>
  <div id="app" class="container py-5">
    <!-- Számláló UI bootstrap-esztétikával -->
    <div class="row justify-content-center mb-3">
      <div class="col-auto">
        <h2>Count: {{ count }}, (demó célra)</h2>
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
        Itt lesznek a REMOTE APP-ok egymás mellett
      </div>
      <div class="card-body">
        <!-- 1) Fő hibaüzenet, ha pl. a /remotes.json nem érhető el -->
        <div v-if="error" class="alert alert-danger" role="alert">
          Hiba történt: {{ error }}
        </div>

        <!-- 2) Részleges hibák (ha 1-1 remote betöltése nem sikerült), de a többi működhet -->
        <div v-if="loadErrors.length" class="alert alert-warning" role="alert">
          <p>Néhány remote nem volt elérhető:</p>
          <ul>
            <li v-for="(err, idx) in loadErrors" :key="'err'+idx">{{ err }}</li>
          </ul>
        </div>

        <!-- 3) Töltési állapot (akkor látszik, ha még nincs hiba és fut a betöltés) -->
        <div v-else-if="loading" class="alert alert-info" role="alert">
          Loading remote apps...
        </div>

        <!-- 4) A sikeresen betöltött remote komponensek egymás mellett -->
        <div class="row">
          <div
              class="col"
              v-for="(Comp, idx) in remoteComponents"
              :key="idx"
          >
            <safe-remote-component :component="Comp" />
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        Itt lesznek a WEB COMPONENT APP-ok egymás mellett
      </div>
      <div class="card-body">
        <!-- 1) Fő hibaüzenet, ha pl. a /remotes.json nem érhető el -->
        <div v-if="error" class="alert alert-danger" role="alert">
          Hiba történt: {{ error }}
        </div>

        <!-- 2) Részleges hibák (ha 1-1 remote betöltése nem sikerült), de a többi működhet -->
        <div v-if="loadErrors.length" class="alert alert-warning" role="alert">
          <p>Néhány remote nem volt elérhető:</p>
          <ul>
            <li v-for="(err, idx) in loadErrors" :key="'err'+idx">{{ err }}</li>
          </ul>
        </div>

        <!-- 3) Töltési állapot (akkor látszik, ha még nincs hiba és fut a betöltés) -->
        <div v-else-if="loading" class="alert alert-info" role="alert">
          Loading remote apps...
        </div>

        <!-- 4) A sikeresen betöltött remote komponensek egymás mellett -->
        <div class="row">
          <div
              class="col"
              v-for="(tagName, idx) in webComponents"
              :key="idx"
          >
            <component v-if="webComponents.length" :is="tagName" v-web-component-props-directive:productData="productData" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { loadRemote } from './loadRemote.js';
import SafeRemoteComponent from "./SafeRemoteComponent.vue";
import webComponentPropsDirective from "./web-component-props-directive";

export default {
  name: 'App',
  components: {SafeRemoteComponent},
  directives: {
    // regisztráljuk a direktívát "ce-prop" néven
    'webComponentPropsDirective': webComponentPropsDirective
  },
  data() {
    return {
      loading: true,          // betöltés folyamatban van-e
      error: null,            // ha a /remotes.json sem tölthető le
      loadErrors: [],         // ha 1-1 remote fut hibára
      remoteComponents: [],   // betöltött remote komponensek
      webComponents: [],      // betöltött web komponensek
      count: 0,               // számláló demo
      productData: {
        name: 'Példa termék',
        price: 102,
        description: 'Ez egy teszt description'
      }
    };
  },
  methods: {
    incrementCount() {
      this.count++;
      this.productData.price += 10;
    },
  },
  async mounted() {
    try {
      // 1) Lekérjük a /remotes.json tartalmát
      // const response = await fetch('https://run.mocky.io/v3/bfdbd135-4185-4545-afe9-0856215629bc');
      const response = await fetch('/remotes.json');
      if (!response.ok) {
        throw new Error(`Nem sikerült lekérni a /remotes.json-t: ${response.status}`);
      }
      const { remotes } = await response.json();

      // 2) Ciklusban végigmegyünk a definíciókon, minden remote-ot megpróbálunk betölteni
      for (const { scope, url, component, isWebComponent, tagName } of remotes) {
        try {
          // a) remoteEntry.js betöltése
          const container = await loadRemote(url, scope);

          // b) a kiválasztott modul lekérése (pl. './RemoteApp')
          const factory = await container.get(`./${component}`);
          const mod = factory();

          // c) a modul default exportja (várhatóan Vue komponens)
          if(isWebComponent) {
            this.webComponents.push(tagName)
          } else {
            this.remoteComponents.push(mod.default || mod);
          }
        } catch (remoteErr) {
          // Ha az adott remoteApp betöltése hibás, logoljuk
          console.error(`Hiba a remote (${scope}) betöltésekor:`, remoteErr);
          this.loadErrors.push(`Remote (${scope}): ${remoteErr}`);
        }
      }
    } catch (err) {
      // Ha már a JSON betöltése sem sikerült, ezt a fő "error" mezőbe írjuk
      this.error = err.toString();
    } finally {
      // A töltés mindenképp véget ér (akár siker, akár hiba)
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
