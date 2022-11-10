import { request } from "@/service/request";

//登录
export const getLogin = (data) => {
  return request({
    url: "/login",
    method: "get",
    data,
    config: {
      timeout: 10000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  });
};

//退出登录
export const getOutLogin = (data) => {
  return request({
    url: "/login/outLogin",
    method: "get",
    data,
    config: {
      timeout: 10000,
    },
  });
};
