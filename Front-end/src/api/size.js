import axiosClient from "./axiosClient";

const END_POINT = {
    USER: "Size",
};

export const getAllSize = () => {
    return axiosClient.get(
        `https://localhost:44324/api/${END_POINT.USER}/GetAllSize`
    );
};
