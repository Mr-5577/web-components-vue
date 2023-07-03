import { storage } from "@/utils/storage";
import { ACCESS_TOKEN, USER_ROLE } from "@/constants/mutation-types.js";

export function check(authority) {
  const current = getCurrentAuthority();
  return current && current.some(item => authority.includes(item));
}
// 判断用户是否登录
export function isLogin() {
  return storage.get(ACCESS_TOKEN) ? true : false;
}
// 登出
export function logout() {
  storage.set(ACCESS_TOKEN, null);
}
// 判断路由白名单
export function needLogin(str) {
  let whiteUrl = ["/login"];
  return whiteUrl.indexOf(str) === -1 ? true : false;
}
