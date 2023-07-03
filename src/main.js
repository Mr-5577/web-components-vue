// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router/index.js";
import store from "./store/index.js";
import ElementUI from "element-ui"; //完整引入elementUI
import "element-ui/lib/theme-chalk/index.css"; //单独引入elementUI样式
import "./directives/drag-directive.js"; //自定义拖拽指令
import "./styles/global.scss"; //全局样式
Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "small",
  menuType: "text"
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
