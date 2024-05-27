import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateItem, removeItem } from "../redux/shopping-cart/cartItemSlices";

import numberWithCommas from "../utils/numberWithCommas";
const CartItem = (props) => {
  const dispatch = useDispatch();
  console.log(props.item);

  const [item, setItem] = useState(props.item);
  const [quantity, setQuantity] = useState(props.item.quantity);

  useEffect(() => {
    setItem(props.item);
    setQuantity(props.item.quantity);
  }, [props.item]);
  console.log(item.product.name);
  const updateQuantity = (opt) => {
    if (opt === "+") {
      dispatch(updateItem({ ...item, quantity: quantity + 1 }));
      //setQuantity(quantity + 1);
    }
    if (opt === "-") {
      dispatch(
        updateItem({ ...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1 })
      );
    }
  };
  const removeCartItem = () => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <div className="cart__item">
        <div className="cart__item__image">
          <img src={item.product.namePath[0]} alt="" />
        </div>
        <div className="cart__item__info">
          <div className="cart__item__info__name">
            <Link>
              {item.product
                ? `${item.product.name} - ${item.color} - ${item.size}`
                : ""}
            </Link>
          </div>
          <div className="cart__item__info__price">
            {item.product ? numberWithCommas(Number(item.product.price)) : ""}
          </div>
          <div className="cart__item__info__quantity">
            <div className="product__info__item__quantity">
              <div
                className="product__info__item__quantity__btn"
                onClick={() => updateQuantity("-")}
              >
                <i className="bx bx-minus"></i>
              </div>
              <div className="product__info__item__quantity__input">
                {quantity}
              </div>
              <div
                className="product__info__item__quantity__btn "
                onClick={() => updateQuantity("+")}
              >
                <i className="bx bx-plus"></i>
              </div>
            </div>
          </div>
          <div className="cart__item__info__del">
            <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {};

export default CartItem;
