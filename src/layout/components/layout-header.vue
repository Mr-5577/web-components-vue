<template>
  <div class="header">
    <transition name="header">
      <div>这里是头部</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutHeader',
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
}
</style>
