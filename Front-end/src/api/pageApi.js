import axiosClient from './axiosClient';

const END_POINT = {
    PRODUCTS: "Products",
    CONTACTS: "Contacts",
    USER: "Taikhoan"
}

export const getProductAPI = (page = 1) => {
    return axiosClient.get(`https://localhost:44396/api/${END_POINT.PRODUCTS}?page=${page}`);
}
export const getProductBySlug = (slug) => {
    return axiosClient.get(`https://localhost:44396/api/${END_POINT.PRODUCTS}/slug?slug=${slug}`);
}
export const sendRequest = (formCT) => {
    return axiosClient.post(`https://localhost:44396/api/${END_POINT.CONTACTS}`, formCT);
}
export const getUser = (username) => {
    return axiosClient.get(`https://localhost:44396/api/${END_POINT.USER}?username=${username}`);
}