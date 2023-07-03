<template>
  <div>
    <template v-for="item in this.menuList">
      <el-submenu
        v-if="item.children.length > 0"
        :index="item.resourceId"
        :key="item.resourceId"
      >
        <template slot="title">
          <i v-if="item.icon" class="el-icon-menu"></i>
          <span slot="title">{{ item.resourceName }}</span>
        </template>
        <!-- 当有子集数据使用自调用，:menuList通过props传递 -->
        <MenuItem :menuList="item.children"></MenuItem>
      </el-submenu>
      <el-menu-item v-else :index="item.resourceId" :key="item.resourceId">
        <i v-if="item.icon" class="el-icon-menu"></i>
        <span>{{ item.resourceName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<script>
export default {
  name: "MenuItem", //递归组件的关键，并且要与引入组件的变量名称一致
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
</style>
