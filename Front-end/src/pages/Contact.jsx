import { useState } from "react";
import { sendRequest } from "../api/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [inputNameValue, setInputNameValue] = useState("");
  const [inputPhoneValue, setInputPhoneValue] = useState("");
  const [inputAddressValue, setInputAddressValue] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputRequestValue, setInputRequestValue] = useState("");
  const notify = () =>
    toast.success("Yêu cầu của bạn đã được gửi đi!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleOnChangeName = (event) => {
    setInputNameValue(event.target.value);
  };
  const handleOnChangePhone = (event) => {
    setInputPhoneValue(event.target.value);
  };
  const handleOnChangeAddress = (event) => {
    setInputAddressValue(event.target.value);
  };
  const handleOnChangeEmail = (event) => {
    setInputEmailValue(event.target.value);
  };
  const handleOnChangRequest = (event) => {
    setInputRequestValue(event.target.value);
  };
  const [checkNull1, setCheckNull1] = useState(false);
  const [checkNull2, setCheckNull2] = useState(false);
  const [checkNull3, setCheckNull3] = useState(false);

  const handleSubmit = async () => {
    if (inputNameValue === "") {
      setCheckNull1(true);
    } else {
      setCheckNull1(false);
    }
    if (inputPhoneValue === "") {
      setCheckNull2(true);
    } else {
      setCheckNull2(false);
    }
    if (inputEmailValue === "") {
      setCheckNull3(true);
    } else {
      setCheckNull3(false);
    }
    if (inputNameValue && inputPhoneValue && inputEmailValue) {
      var formct = {
        NameKH: inputNameValue,
        PhoneKH: inputPhoneValue,
        AddressKH: inputAddressValue,
        EmailKH: inputEmailValue,
        RequestKH: inputRequestValue,
      };
      await sendRequest(formct);
      notify();
      setInputNameValue("");
      setInputPhoneValue("");
      setInputEmailValue("");
      setInputAddressValue("");
      setInputRequestValue("");
    }
  };
  return (
    <div className="bodyContact">
      <div className="containerContact">
        <div className="headerContact">
          <h1>LIÊN HỆ VỚI CHÚNG TÔI</h1>
          <p>Công ty cổ phần YOLO</p>
        </div>
        <div className="bodyContact">
          <div className="block">
            <label>Họ tên</label> <br />
            <input
              type="text"
              className={`name ${checkNull1 ? "error" : ""}`}
              onChange={handleOnChangeName}
              value={inputNameValue}
            />
            <p className={`${checkNull1 ? "textError" : "Normal"}`}>
              Vui lòng nhập họ và tên
            </p>
          </div>
          <div className="block">
            <label>Số điện thoại</label> <br />
            <input
              type="text"
              className={`phone ${checkNull2 ? "error" : ""}`}
              onChange={handleOnChangePhone}
              value={inputPhoneValue}
            />
            <p className={`${checkNull2 ? "textError" : "Normal"}`}>
              Vui lòng nhập số điện thoại
            </p>
          </div>
          <div className="block">
            <label>Địa chỉ</label> <br />
            <input
              type="text"
              className="address"
              onChange={handleOnChangeAddress}
              value={inputAddressValue}
            />
          </div>
          <div className="block">
            <label>Email</label> <br />
            <input
              type="text"
              className={`email ${checkNull3 ? "error" : ""}`}
              onChange={handleOnChangeEmail}
              value={inputEmailValue}
            />
            <p className={`${checkNull3 ? "textError" : "Normal"}`}>
              Vui lòng nhập Email
            </p>
          </div>
          <div className="block">
            <label>Yêu Cầu</label> <br />
            <textarea
              rows={6}
              cols={40}
              className="request"
              onChange={handleOnChangRequest}
              value={inputRequestValue}
            />
          </div>
          <div className="block">
            <button className="submit" onClick={handleSubmit}>
              Gửi
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default Contact;
