<template>
  <div class="card mx-auto" style="width: 20rem; background-color: #f9f2f4">
    <img
        src="https://picsum.photos/320/180"
        class="card-img-top"
        alt="Random image"
    />
    <div class="card-body">
      <h5 class="card-title">Ez itt a Remote 2 APP</h5>
      <p class="card-text">
        Üdv a második remote komponensből! Ez is külön betöltött app, saját
        megjelenéssel és funkciókkal.
      </p>
      <!-- Gomb, amivel "előhívod" az értesítést -->
      <button @click="doSomething" class="btn btn-danger">
        Távoli gomb #2
      </button>
      <!-- Látványosabb Bootstrap alert -->
      <div
          v-if="showAlert"
          class="alert alert-warning alert-dismissible fade show mt-3"
          role="alert"
      >
        A második távoli komponens gombja is működik!
        <!-- Bezáró gomb -->
        <button
            type="button"
            class="close"
            aria-label="Close"
            @click="hideAlert"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnotherRemoteApp',
  data() {
    return {
      showAlert: false,
    };
  },
  methods: {
    doSomething() {
      this.showAlert = true;
      // Például automatikusan el is rejthetjük pár másodperc után:
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
/* Lehet ide is írni extra stílusokat, ha még jobban el akarod téríteni */
</style>
