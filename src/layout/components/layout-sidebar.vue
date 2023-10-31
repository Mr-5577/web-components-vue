<template>
  <div class="sidebar">
    <transition name="sidebar">
      <div>这里是侧边栏</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LayoutSidebar',
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: cornflowerblue;
}
</style>
