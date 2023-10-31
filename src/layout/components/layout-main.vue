<template>
  <section class="app-main">
    <transition name="main-fade">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  components: {},
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped></style>
