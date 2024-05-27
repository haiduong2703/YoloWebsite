// ProfileCard.jsx
import React, { useEffect, useState } from "react";
import avt from "../assets/images/5.jpg";
import { getUserById } from "../api/user";
import Button from "../components/Button";
import { updateUser } from "../api/user";
import { ToastContainer, toast } from "react-toastify";
function ProfileCard() {
  const [user, setUser] = useState({
    address: "",
    email: "",
    fullname: "",
    id: "",
    idRole: "",
    password: "",
    phone: "",
    status: "",
    username: "",
  });
  const getUser = async () => {
    await getUserById(sessionStorage.getItem("id")).then((res) => {
      setUser(res);
    });
  };
  const [profile, setProfile] = useState({
    fullName: "",
    address: "",
    email: "mht@gmail.com",
    phone: "9997998998",
    recentProject: "Sami Dsouja",
    mostViewedProject: "Dinoter huasimm",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lưu thông tin profile
    console.log(user);
    const data = {
      id: user.id,
      fullname: user.fullname,
      phone: user.phone,
      address: user.address,
    };
    await updateUser(data)
      .then((res) => {
        toast.success("Cập nhập thành công thông tin !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error("Cập nhập thất bại !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="profile-card">
      <div className="profile-section">
        <img src={avt} alt="Avatar" className="avatar" />
        <h2>{user.fullname}</h2>
        <p>Khách hàng</p>
      </div>
      <div className="info-section">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ và tên:</label>
            <input
              type="text"
              name="fullname"
              value={user.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Địa chỉ:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled="true"
            />
          </div>
          {/* Thêm các trường thông tin khác tương tự */}
          <Button size="sm" type="submit">
            Lưu
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProfileCard;
