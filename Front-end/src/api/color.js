import axiosClient from "./axiosClient";

const END_POINT = {
    USER: "Color",
};

export const getAllColor = () => {
    return axiosClient.get(
        `https://localhost:44324/api/${END_POINT.USER}/GetAllColor`
    );
};
