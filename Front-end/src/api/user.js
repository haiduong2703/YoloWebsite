import axiosClient from "./axiosClient";

const END_POINT = {
  USER: "User",
};

export const signUpUser = (data) => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.USER}/GetUserByName?name=${data}`
  );
};
export const updateUser = (data) => {
  return axiosClient.put(
    `https://localhost:44324/api/${END_POINT.USER}/UpdateUser`, data
  );
};
export const registerUser = (data) => {
  return axiosClient.post(
    `https://localhost:44324/api/${END_POINT.USER}/CreateUser`, data
  );
};
export const getUserById = (id) => {
  return axiosClient.get(
    `https://localhost:44324/api/${END_POINT.USER}/GetUserById?id=${id}`,
  );
};
export const changePassword = (data) => {
  return axiosClient.put(
    `https://localhost:44324/api/${END_POINT.USER}/ChangePassword`, data
  );
};

export const getAllUser = (data) => {
  return axiosClient.post(
    `https://localhost:44324/api/${END_POINT.USER}/GetAllUser`, data,
  );
};
export const changeStatusUser = (id, status) => {
  return axiosClient.put(
    `https://localhost:44324/api/${END_POINT.USER}/ChangeStatusUser?id=${id}&status=${status}`
  );
};