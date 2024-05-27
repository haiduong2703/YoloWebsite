import React, { useEffect } from "react";
import { CreateOrder } from "../api/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeAllItems } from "../redux/shopping-cart/cartItemSlices.js";

const SuccessCOD = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div className="payment-done-container">
      <div className="payment-done-content">
        <div className="checkmark-icon">&#10004;</div>
        <h1>Bạn đã đặt hàng thành công</h1>
        <p>Đơn hàng sớm được vận chuyển</p>
        <p>Cảm ơn bạn đã mua sắm, chúc bạn có một ngày tốt lành</p>
        <button className="go-back-btn" onClick={handleClick}>
          Trang chủ
        </button>
      </div>
    </div>
  );
};
export default SuccessCOD;
