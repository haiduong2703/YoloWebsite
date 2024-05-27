import React from "react";

import { useSelector, useDispatch } from "react-redux";

import ProductView from "./ProductView";
import Button from "./Button";

import { remove } from "../redux/product-modal/productModalSlice";
//import productData from "../assets/fake-data/products";
import { useEffect, useState } from "react";
import { getProductBySlug } from "../api/product.js";
import { getProductById } from "../api/api.js";

const ProductViewModal = () => {
  const productSlug = useSelector((state) => state.productModal.value);

  const dispatch = useDispatch();

  const [product, setProduct] = useState(undefined);
  console.log(productSlug);

  const fetchData = async () => {
    if (productSlug) {
      const data = {
        id: productSlug,
      };
      const productData = await getProductById(data);
      setProduct(productData);
    }
  };
  useEffect(() => {
    fetchData();
  }, [productSlug]);

  console.log(productSlug);

  return (
    <div
      className={`product-view___modal ${productSlug === null ? "" : "active"}`}
    >
      {productSlug !== null ? (
        <div className="product-view___modal__content">
          <ProductView product={product} />
          <div className="product-view___modal__content__close">
            <Button size="sm" onClick={() => dispatch(remove())}>
              Đóng
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductViewModal;
