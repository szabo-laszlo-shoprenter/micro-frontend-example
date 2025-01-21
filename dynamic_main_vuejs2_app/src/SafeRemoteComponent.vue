<template>
  <div v-if="hasError">
    <!-- Ez lesz a fallback UI, amit a hibás remote komponens helyett jelenítünk meg -->
    <div class="alert alert-danger">
      Hiba történt a betöltött remote komponens futtatása során.
    </div>
  </div>
  <div v-else>
    <!-- Normál esetben a remote komponens rendesen működik -->
    <component :is="component" />
  </div>
</template>

<script>
export default {
  name: 'SafeRemoteComponent',

  props: {
    component: {
      type: [Object, Function],
      required: true
    }
  },

  data() {
    return {
      hasError: false
    };
  },

  // Vue 2.x "errorCaptured" hook – akkor fut, ha a belső komponens hibát dob
  errorCaptured(err, vm, info) {
    console.error('Remote komponens hiba:', err, info);
    // Itt a "hasError" flag beállításával letiltjuk a child renderelését
    this.hasError = true;

    // Ha `return false`-t adunk vissza, a hiba nem terjed tovább a root-ig.
    // Ha `return true`, akkor tovább terjed a hiba.
    return false;
  }
};
</script>
