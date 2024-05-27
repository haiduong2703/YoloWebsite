import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import Helmet from "../components/Helmet";
import CartItem from "../components/CartItem";
import numberWithCommas from "../utils/numberWithCommas";

import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { getProductBySlug } from "../api/product.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Payment } from "../api/api.js";
import { getProductById } from "../api/api.js";
import { useDispatch } from "react-redux";
const ThanhToan = () => {
  const cartItems = useSelector((state) => state.cartItems.value);
  const dispatch = useDispatch();

  console.log(cartItems);
  //const navigate = useNavigate();
  const history = useHistory();
  const [cartProducts, setCartProducts] = useState([]);
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const [totalProducts, setTotalProducts] = useState(0);
  const [online, setOnline] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const handleOnline = async (e) => {
    sessionStorage.setItem("totalPrice", totalPrice);
    sessionStorage.setItem("totalProduct", totalProducts);
    const data = {
      orderId: Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000,
      fullName: sessionStorage.getItem("fullname"),
      description: "Thanh toán cho đơn hàng",
      amount: totalPrice,
      createDate: new Date(),
    };
    await Payment(data).then((res) => {
      window.location.assign(res);
    });
  };
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get("token");
  console.log(token);
  if (token) {
    // Nếu có token (giả sử token là biểu diễn cho việc thanh toán đã hoàn thành)
    // Chuyển hướng về trang chủ
    window.location.assign("http://localhost:3000");
  }
  const handleOffline = (e) => {
    setOnline(e.target.value);
  };

  const getCartItemsDetal = async (cartItems) => {
    const promises = cartItems.map(async (e) => {
      const productSlug = await getProductById(e.idProduct);
      return {
        ...e,
        product: productSlug,
      };
    });

    return Promise.all(promises);
  };
  const ThanhToan = () => {
    if (online === "online") {
      history.push("/PhanHoi");
      sessionStorage.setItem("money", numberWithCommas(totalPrice + 30000));
    }
    if (online === "offline") {
      history.push("/offline");
    }
  };
  useEffect(() => {
    async function updateCart() {
      const updatedCart = await getCartItemsDetal(cartItems);
      setCartProducts(updatedCart);

      const totalProducts = updatedCart.reduce(
        (total, item) => total + Number(item.quantity),
        0
      );
      setTotalProducts(totalProducts);

      const totalPrice = updatedCart.reduce(
        (total, item) =>
          total + Number(item.product.price) * Number(item.quantity),
        0
      );
      setTotalPrice(totalPrice);
    }

    updateCart();
  }, [cartItems]);
  return (
    <div className="containerPay">
      <div className="rowPay">
        <h1>THÔNG TIN THANH TOÁN</h1>
        <p className="pPay">Họ và tên: {sessionStorage.getItem("fullname")}</p>
        <p className="pPay">Số điện thoại: {sessionStorage.getItem("phone")}</p>
        <p className="pPay">Địa chỉ: {sessionStorage.getItem("address")}</p>
        <h2>Tổng số sản phẩm đặt mua: {numberWithCommas(totalProducts)}</h2>
        <h2>Tiền sản phẩm đặt mua: {numberWithCommas(totalPrice)}đ</h2>
        <h2>Phí ship: 30,000đ</h2>
        <h2>
          Tổng số tiền phải thanh toán: {numberWithCommas(totalPrice + 30000)}{" "}
        </h2>
        {/* <input type="radio" value="online" name="pay" onChange={handleOnline} />
        <label>Thanh toán Online</label>
        <input
          type="radio"
          value="offline"
          name="pay"
          onChange={handleOffline}
        />
        <label>Thanh toán Trực tiếp</label>
        <br /> */}
        <button size="sm" onClick={ThanhToan}>
          Thanh toán trực tiếp
        </button>
        <button size="sm" onClick={handleOnline}>
          Thanh toán VNPay
        </button>
      </div>
    </div>
  );
};
export default ThanhToan;
