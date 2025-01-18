<template>
  <div id="app">
    <h1>Hello Vue 2!</h1>
    <component :is="RemoteComponent" v-if="RemoteComponent" />
    <p v-else>Loading remote app...</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      RemoteComponent: null,
    };
  },
  async mounted() {
    const remote = await import("remoteApp/RemoteApp");
    this.RemoteComponent = remote.default;
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
}
</style>
