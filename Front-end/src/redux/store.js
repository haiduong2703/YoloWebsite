import { configureStore } from "@reduxjs/toolkit";
import productModalSlice from "./product-modal/productModalSlice";
import userModalSlice from "./user-modal/userModalSlice";
import cartItemSlices from "./shopping-cart/cartItemSlices";

export const store = configureStore({
  reducer: {
    productModal: productModalSlice,
    cartItems: cartItemSlices,
    user: userModalSlice,
  },
});
