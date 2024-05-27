import axiosClient from './axiosClient';

const END_POINT = {
    PRODUCTS: "Products",
    CONTACTS: "Contacts",
    USER: "Taikhoan",
    PRODUCT: "Product",
    CATEGORY: "Category",
    ORDER: "Order",
    CONTACT: "Contact",
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
export const getSoTrang = () => {
    return axiosClient.get(`https://localhost:44396/api/${END_POINT.USER}/GetSoTrang`);
}
export const createProduct = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.PRODUCT}/CreateProduct`, data);
}
export const getAllCategory = (dta) => {
    return axiosClient.get(`https://localhost:44324/api/${END_POINT.CATEGORY}/GetAllCategory`);
}
export const getAllProduct = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.PRODUCT}/GetAll`, data);
}
export const getProductNew = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.PRODUCT}/GetProductNew`, data);
}
export const getProductById = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.PRODUCT}/GetProductById`, data);
}
export const removeProductById = (id) => {
    return axiosClient.delete(`https://localhost:44324/api/${END_POINT.PRODUCT}/DeleteProduct?id=${id}`);
}
export const updateProduct = (data) => {
    return axiosClient.put(`https://localhost:44324/api/${END_POINT.PRODUCT}/UpdateProduct`, data);
}
export const Payment = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.PRODUCT}/Payment`, data);
}
export const CreateOrder = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.ORDER}/CreateOrder`, data);
}
export const CreateContact = (data) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.CONTACT}/CreateContact`, data);
}
export const GetAllContact = (data) => {
    return axiosClient.get(`https://localhost:44324/api/${END_POINT.CONTACT}/GetAllContact`, data);
}
export const GetContactById = (id) => {
    return axiosClient.get(`https://localhost:44324/api/${END_POINT.CONTACT}/GetContactById?id=${id}`);
}
export const ReplyContact = (data) => {
    return axiosClient.put(`https://localhost:44324/api/${END_POINT.CONTACT}/Reply`, data);
}
export const DeletedContact = (id) => {
    return axiosClient.delete(`https://localhost:44324/api/${END_POINT.CONTACT}/DeletedContact?id=${id}`);
}
export const getAllOrder = (status) => {
    return axiosClient.post(`https://localhost:44324/api/${END_POINT.ORDER}/GetAllOrder`, status);
}
export const ConfirmOrder = (id) => {
    return axiosClient.put(`https://localhost:44324/api/${END_POINT.ORDER}/ConfirmOrder?id=${id}`);
}
export const CancelOrder = (id, lyDo) => {
    return axiosClient.put(`https://localhost:44324/api/${END_POINT.ORDER}/CancelOrder?id=${id}&lyDo=${lyDo}`);
}
export const DeliveredOrder = (id) => {
    return axiosClient.put(`https://localhost:44324/api/${END_POINT.ORDER}/DeliveredOrder?id=${id}`);
}
export const SuccessdOrder = (id) => {
    return axiosClient.put(`https://localhost:44324/api/${END_POINT.ORDER}/SuccessOrder?id=${id}`);
}
