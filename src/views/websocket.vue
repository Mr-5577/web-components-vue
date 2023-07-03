<template>
  <div>
    <el-button type="primary" @click="handleConnect">连接websocket</el-button>
    <el-button type="primary" @click="handleClose">关闭websocket</el-button>
  </div>
</template>

<script>
import { connectWebsocket, closeWebsocket } from "@/utils/websocket";
export default {
  data() {
    return {};
  },
  methods: {
    handleConnect() {
      connectWebsocket(
        // 测试地址
        "wss://echo.websocket.org",
        // 传递给后台的数据
        { ping: true },
        // 成功拿到后台返回的数据的回调函数
        (data) => {
          console.log("成功的回调函数, 接收到的data数据： ", data);
        },
        // websocket连接失败的回调函数
        () => {
          console.log("失败的回调函数");
        }
      );
    },
    handleClose() {
      closeWebsocket();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>