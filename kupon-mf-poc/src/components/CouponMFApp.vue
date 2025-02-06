<template>
  <div>
    <CouponHeader/>
    <router-view></router-view>
  </div>
</template>

<script>

import CouponHeader from "./CouponHeader.vue";

export default {
  name: 'CouponMFApp',
  components: {CouponHeader},
};
</script>
