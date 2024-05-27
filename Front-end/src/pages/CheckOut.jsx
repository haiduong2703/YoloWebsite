// PaymentForm.js
import React, { useState } from "react";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    quantity: "",
    shippingFee: "",
    totalPayment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Họ và tên</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address1">Địa chỉ nhận hàng</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
          />
        </div>
        {/* ...other address fields... */}
        <div className="form-group">
          <label htmlFor="quantity">Product Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingFee">Shipping Fee</label>
          <input
            type="text"
            id="shippingFee"
            name="shippingFee"
            value={formData.shippingFee}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalPayment">Total Payment</label>
          <input
            type="text"
            id="totalPayment"
            name="totalPayment"
            value={formData.totalPayment}
            onChange={handleChange}
          />
        </div>
        <div className="form-group payment-buttons">
          <button type="button" className="vnpay-btn">
            VNPay
          </button>
          <button type="button" className="cod-btn">
            COD
          </button>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
