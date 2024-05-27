import React, { useEffect } from "react";
import { CreateOrder } from "../api/api";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeAllItems } from "../redux/shopping-cart/cartItemSlices.js";

const Success = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);
  console.log(cartItems);
  console.log(sessionStorage.getItem("totalPrice"));
  const history = useHistory();
  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      const vnp_Amount = urlParams.get("vnp_Amount");
      const vnp_BankCode = urlParams.get("vnp_BankCode");
      const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
      const vnp_CardType = urlParams.get("vnp_CardType");
      const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
      const vnp_PayDate = urlParams.get("vnp_PayDate");
      const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
      const vnp_TmnCode = urlParams.get("vnp_TmnCode");
      const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
      const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
      const vnp_TxnRef = urlParams.get("vnp_TxnRef");
      const vnp_SecureHash = urlParams.get("vnp_SecureHash");
      if (vnp_ResponseCode == "00") {
        const dataProduct = cartItems.map((item) => {
          const totalprice = Number(item.quantity * item.price);
          console.log(totalprice);
          return {
            quantiny: item.quantity,
            price: item.price,
            totalPrice: totalprice,
            idProduct: item.idProduct,
            idColor: item.idColor,
            idSize: item.idSize,
          };
        });
        const data = {
          code: vnp_OrderInfo.toString(),
          totalPrice: Number(vnp_Amount / 100),
          quantiny: Number(sessionStorage.getItem("totalProduct")),
          customerName: sessionStorage.getItem("nameOrder"),
          customerPhone: sessionStorage.getItem("phoneOrder"),
          address: sessionStorage.getItem("addressOrder"),
          createBy: new Date(),
          status: 1,
          idUser: sessionStorage.getItem("id"),
          orderDetails: dataProduct,
          typePay: 1,
        };
        await CreateOrder(data).then((res) => {
          dispatch(removeAllItems());

          console.log("Hello");
        });
      }
    }
  }, []);
  const handleClick = () => {
    history.push("/");
  };
  return (
    <div className="payment-done-container">
      <div className="payment-done-content">
        <div className="checkmark-icon">&#10004;</div>
        <h1>Thanh toán thành công!</h1>
        <p>Cảm ơn bạn đã hoàn tất thanh toán trực tuyến an toàn của mình.</p>
        <p>Chúc bạn có một ngày tốt lành</p>
        <button className="go-back-btn" onClick={handleClick}>
          Quay về
        </button>
      </div>
    </div>
  );
};
export default Success;
