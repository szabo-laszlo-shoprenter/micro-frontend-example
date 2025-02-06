<template>
  <div>
    <CouponHeader/>
    <router-view></router-view>
    AT: {{ accessToken }}
  </div>
</template>

<script>

import CouponHeader from "./CouponHeader.vue";

export default {
  name: 'CouponMFApp',
  components: {CouponHeader},
  data() {
    return {
      accessToken : ''
    }
  },
  async mounted() {
    this.accessToken = await this.$oauthManager.getAccessToken();
  }
};
</script>
