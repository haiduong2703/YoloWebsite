import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { addItem } from "../redux/shopping-cart/cartItemSlices";

import { withRouter } from "react-router-dom";

import Button from "./Button";
import { remove } from "../redux/product-modal/productModalSlice";
const ProductView = (props) => {
  const dispatch = useDispatch();
  const colorDictionary = {
    Xanh: "green",
    Đỏ: "red",
    Tím: "purple",
    Vàng: "yellow",
    Nâu: "brown",
    Đen: "black",
    Trắng: "white",
    Hồng: "pink",
  };
  const colorDictionary2 = {
    green: "Xanh",
    red: "Đỏ",
    purple: "Tím",
    yellow: "Vàng",
    brown: "Nâu",
    black: "Đen",
    white: "Trắng",
    pink: "Hồng",
  };
  const colorDictionary3 = {
    green: 1,
    red: 2,
    purple: 3,
    yellow: 4,
    brown: 5,
    black: 6,
    white: 7,
    pink: 8,
  };
  const sizeConvert = {
    S: 1,
    M: 2,
    L: 3,
    XL: 4,
    XXL: 5,
  };
  const vietnameseColor = "";
  const product = props.product
    ? {
        ...props.product,
        nameColor: props.product.nameColor.map(
          (vietnameseColor) => colorDictionary[vietnameseColor]
        ),
      }
    : null;
  const [previewImg, setPreviewImg] = useState(
    product ? product.namePath[0] : ""
  );
  const [imageChanged, setImageChanged] = useState(false);
  const [quantityChanged, setQuantityChanged] = useState(false);
  const [colorChangeCheck, setColorChangeCheck] = useState(false);
  const [sizeChangeCheck, setSizeChangeCheck] = useState(false);
  useEffect(() => {
    if (
      product &&
      !imageChanged &&
      !quantityChanged &&
      !colorChangeCheck &&
      !sizeChangeCheck
    ) {
      setPreviewImg(product.namePath[0]);
      setQuantity(1);
      setColor(undefined);
      setSize(undefined);
      console.log(product);
      console.log(previewImg);
    }
  }, [product]);
  if (product === undefined)
    product = {
      price: 0,
      title: "",
      nameColor: [],
      nameSize: [],
      namePath: [],
    };

  const [descriptionExpand, setDescriptionExpand] = useState(false);

  const [color, setColor] = useState(undefined);
  const [colorValue, setColorValue] = useState(undefined);
  const [colorId, setColorId] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [sizeValue, setSizeValue] = useState(undefined);
  const updateQuantity = (type) => {
    setQuantityChanged(true);
    console.log(type);
    if (type === "plus") {
      setQuantity(quantity + 1);
      console.log(setQuantity);
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    }
  };

  const check = () => {
    //let res = true;
    if (color === undefined) {
      alert("Vui lòng chọn màu sắc!");
      return false;
    }
    if (size === undefined) {
      alert("Vui lòng chọn kích cỡ!");
      return false;
    }
    return true;
  };

  const addToCart = () => {
    if (check()) {
      console.log(color);
      console.log(size);
      console.log(quantity);
      dispatch(
        addItem({
          quantity: quantity,
          price: product.price,
          color: colorValue,
          size: size,
          idSize: sizeValue,
          idColor: colorId,
          idProduct: product.id,
          name: product.name,
        })
      );
      alert("Thêm vào giỏ hàng thành công");
    }
  };
  const clickChangeImage = (url) => {
    setPreviewImg(url);
    setImageChanged(true);
  };
  const goToCart = () => {
    if (check()) {
      dispatch(
        addItem({
          quantity: quantity,
          price: product.price,
          color: colorValue,
          size: size,
          idSize: sizeValue,
          idColor: colorId,
          idProduct: product.id,
          name: product.name,
        })
      );

      props.history.push("/cart");
      dispatch(remove());
    }
  };
  const changeColor = (value) => {
    setColorChangeCheck(true);
    setColor(value);
    setColorValue(colorDictionary2[value]);
    setColorId(colorDictionary3[value]);
  };
  const changeSize = (value) => {
    setSizeChangeCheck(true);
    setSize(value);
    setSizeValue(sizeConvert[value]);
  };
  return (
    <div className="product">
      <div className="product__images">
        <div className="product__images__list">
          <div
            className="product__images__list__item"
            onClick={() => clickChangeImage(product.namePath[0])}
          >
            <img src={product ? product.namePath[0] : ""} alt="" />
          </div>
          <div
            className="product__images__list__item"
            onClick={() => clickChangeImage(product.namePath[1])}
          >
            <img src={product ? product.namePath[1] : ""} alt="" />
          </div>
        </div>
        <div className="product__images__main">
          <img src={previewImg} alt="" />
        </div>
        <div
          className={`product-description ${descriptionExpand ? "expand" : ""}`}
        >
          <div className="product-description__title">Chi tiết sản phẩm</div>
          <div
            className="product-description__content"
            dangerouslySetInnerHTML={{
              __html: product ? product.description : "",
            }}
          ></div>
          <div className="product-description__toggle">
            <Button
              size="sm"
              onClick={() => setDescriptionExpand(!descriptionExpand)}
            >
              {descriptionExpand ? "Thu gọn" : "Xem thêm"}
            </Button>
          </div>
        </div>
      </div>
      <div className="product__info">
        <h1 className="product__info__title">{product ? product.name : ""}</h1>
        <div className="product__info__item">
          <span className="product__info__item__price">
            {product ? product.price : ""}
          </span>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Màu sắc</div>
          <div className="product__info__item__list">
            {product &&
              product.nameColor.map((item, index) => (
                <div
                  key={index}
                  className={`product__info__item__list__item ${
                    color === item ? "active" : ""
                  }`}
                  onClick={() => changeColor(item)}
                >
                  <div className={`circle bg-${item.trim()}`}></div>
                </div>
              ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Kích cỡ</div>
          <div className="product__info__item__list">
            {product &&
              product.nameSize.map((item, index) => (
                <div
                  key={index}
                  className={`product__info__item__list__item ${
                    size === item ? "active" : ""
                  }`}
                  onClick={() => changeSize(item)}
                >
                  <span className="product__info__item__list__item__size">
                    {item}
                  </span>
                </div>
              ))}
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__title">Số lượng</div>

          <div className="product__info__item__quantity">
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("minus")}
            >
              <i className="bx bx-minus"></i>
            </div>
            <div className="product__info__item__quantity__input">
              {quantity}
            </div>
            <div
              className="product__info__item__quantity__btn"
              onClick={() => updateQuantity("plus")}
            >
              <i className="bx bx-plus"></i>
            </div>
          </div>
        </div>
        <div className="product__info__item">
          <div className="product__info__item__list">
            <Button onClick={() => addToCart()}>Thêm vào giỏ hàng</Button>
            <Button onClick={() => goToCart()}>Mua ngay</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default withRouter(ProductView);
