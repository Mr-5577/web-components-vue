<template>
  <el-container class="layoutPage">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <Header></Header>
      </el-header>
      <!-- 内容区 -->
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/layout/components/layout-header';
import Sidebar from '@/layout/components/layout-sidebar';
import Main from '@/layout/components/layout-main';
export default {
  name: 'Layout',
  components: { Header, Sidebar, Main },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.layoutPage {
  width: 100%;
  height: 100%;
  background-color: rgb(174, 238, 242);
}
</style>
