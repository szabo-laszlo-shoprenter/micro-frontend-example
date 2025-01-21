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
      <!-- Gomb, amivel "előhívod" az értesítést -->
      <button @click="doSomething" class="btn btn-primary">
        Távoli gomb
      </button>
            <!-- Látványosabb Bootstrap alert -->
      <div
          v-if="showAlert"
          class="alert alert-success alert-dismissible fade show mt-3"
          role="alert"
      >
        Távoli komponens gombja is működik!
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
  name: 'RemoteApp',
  data() {
    return {
      showAlert: false,
    };
  },
  mounted() {
    // throw new Error('Ez itt egy szándékos hiba a remote komponensben!');
  },
  methods: {
    doSomething() {
      // Itt a natív "alert" helyett most csak egy boolean-t állítunk be,
      // így a "v-if" alapján megjelenik az alert a DOM-ban.
      this.showAlert = true;

      // Opcionálisan pár másodperc múlva eltüntetheted automatikusan:
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
