// ContactPage.js
import React, { useState } from "react";
import { CreateContact } from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    request: "",
    sendDate: Date.now(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    const data = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      request: formData.request,
      sendDate: new Date(),
    };
    await CreateContact(data).then((res) => {
      if (typeof res === "number") {
        toast.success("Gửi yêu cầu thành công !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        setFormData({
          customerName: "",
          customerPhone: "",
          customerEmail: "",
          request: "",
          sendDate: Date.now(),
        });
      } else {
        toast.success("Gửi yêu cầu thất bại vui lòng thử lại !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    });
  };

  return (
    <div className="contact-page-container">
      <div className="contact-form-section">
        <h2>Liên hệ</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Họ và tên"
            value={formData.customerName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="customerEmail"
            placeholder="Email"
            value={formData.customerEmail}
            onChange={handleChange}
          />
          <input
            type="text"
            name="customerPhone"
            placeholder="Phone"
            value={formData.customerPhone}
            onChange={handleChange}
          />
          <textarea
            name="request"
            placeholder="Message"
            value={formData.request}
            onChange={handleChange}
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="contact-info-section">
        <h2>Thông tin liên hệ</h2>
        <p>
          <strong>Địa chỉ:</strong> 37 phố Hoa Bằng, phường Yên Hòa, quận Cầu
          Giấy, TP. Hà Nội
        </p>
        <p>
          <strong>Phone:</strong> +84 3678 05 247
        </p>
        <p>
          <strong>Email:</strong> yolo@gmail.com
        </p>
        <p>
          <strong>Website:</strong> yolo.com.vn
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
