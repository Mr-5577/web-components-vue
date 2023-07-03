import { storage } from "@/utils/storage";
import { login, logout } from "@/api/login";
import { ACCESS_TOKEN, USER_ROLE } from "@/constants/mutation-types.js";

const user = {
  state: {
    name: "123",
    userInfo: {
      userName: "admin",
      password: 123456
    }
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name;
    }
  },
  actions: {
    // Login({ state, commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     login(payload)
    //       .then(response => {
    //         //token保存时长7天
    //         storage.set(ACCESS_TOKEN, "sjdgajs22343343hdjsfse8928928token");
    //         commit("SET_NAME", "wupeng");
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    // Logout({ state, commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     logout()
    //       .then(() => {
    //         commit("SET_NAME", "");
    //         storage.remove(ACCESS_TOKEN);
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
};

export default user;
