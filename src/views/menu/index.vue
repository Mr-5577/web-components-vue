<template>
  <el-aside width="auto" class="asideMain">
    <el-menu
      default-active="1-4-1"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#dcbd51"
      class="el-menu-vertical"
    >
      <!-- 递归动态菜单 -->
      <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
  </el-aside>
</template>

<script>
import MenuItem from "./menu-item.vue"; // 引入递归菜单组件
export default {
  name: "NavigationMenu",
  components: { MenuItem },
  data() {
    return {
      menuList: [
        {
          resourceId: "0",
          icon: true,
          resourceName: "首页",
          children: [],
        },
        {
          resourceId: "1",
          icon: true,
          resourceName: "一级菜单1",
          children: [
            {
              resourceId: "21",
              resourceName: "二级菜单1",
              children: [],
            },
            {
              resourceId: "22",
              resourceName: "二级菜单2",
              children: [
                {
                  resourceId: "31",
                  resourceName: "三级菜单1",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          resourceId: "2",
          icon: true,
          resourceName: "一级菜单2",
          children: [],
        },
      ],
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.asideMain {
  min-height: calc(100vh);
  background-color: #545c64;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
  // min-height: 400px;
}
</style>