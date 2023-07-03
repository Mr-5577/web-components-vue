import { get, post } from "../request/http";

const userApi = {
  Login: "/auth/login",
  Logout: "/user/logout"
};

export const login = data => post(userApi.Login, data);
export const logout = () => post(userApi.Logout);
