<template>
  <el-container>
    <!-- 路由导航菜单 -->
    <Menu :isCollapse="isCollapse"></Menu>
    <!-- 内容区域 -->
    <el-container>
      <el-header class="headerTop">
        <el-radio-group v-model="isCollapse">
          <i
            :class="[
              isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold',
              'foldIcon',
            ]"
            @click="
              () => {
                isCollapse = !isCollapse;
              }
            "
          ></i>
        </el-radio-group>
        <div @click="handleTable">退出登录</div>
      </el-header>
      <!-- 面包屑 -->
      <!-- <div class="breadcrumbBox">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/index' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div> -->
      <!-- 内容区域 -->
      <el-main style="background: #eee">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import router from "@/router/index";
import Menu from "./menu/index.vue";
export default {
  name: "index",
  components: { Menu },
  data() {
    return {
      isCollapse: false, //控制菜单栏展开/收起
    };
  },
  created() {
    // console.log(router);
  },
  methods: {
    handleTable() {
      this.$router.push("/tablePage");
    },
  },
};
</script>

<style lang="scss" scoped>
.foldIcon {
  cursor: pointer;
  font-size: 30px;
  color: #525050;
}
.headerTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.breadcrumbBox {
  padding: 10px 20px;
}
</style>