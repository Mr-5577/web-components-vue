import Vue from "vue";
import VueRouter from "vue-router";
import { check, isLogin, logout, needLogin } from "@/utils/auth";
import HelloWorld from "@/components/HelloWorld";
import login from "@/views/login/index.vue";
import Home from "@/views/index.vue";

// 解决重复触发同一个路由导致控制台报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "HelloWorld",
  //   component: HelloWorld
  // },
  {
    path: "/",
    name: "登录",
    component: login
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/index",
    name: "首页",
    // component: Home,
    redirect: "home/index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/home/index",
        name: "home",
        component: () => import("@/views/home/index.vue")
      },
      {
        path: "/tablePage",
        name: "tablePage",
        component: () => import("@/views/tablePage.vue") // 懒加载方式
      }
    ]
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * 路由全局守卫
 */
// router.beforeEach((to, from, next) => {
//   //前往不需要登录的页面时，如果已登录过，需要先退出，清除token
//   if (!needLogin(to.path)) {
//     if (isLogin()) {
//       logout();
//     }
//     next();
//   } else {
//     // 前往需要登陆的页面，如果用户还没登陆，跳向登陆页
//     if (!isLogin()) {
//       next({ path: "/login" });
//     } else {
//       const record = findLast(to.matched, record => record.meta.authority);
//       // 用户已经登陆但没有该页面权限
//       if (record && !check(record.meta.authority)) {
//         notification.error({
//           message: "403",
//           description: "您没有查看该页面的权限"
//         });
//         next({ path: "/403" });
//       }
//       next();
//     }
//   }
// });

export default router;
