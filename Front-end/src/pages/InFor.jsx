import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import ProfileCard from "./Information";
import { UserOutlined, BankOutlined } from "@ant-design/icons";
import Button from "../components/Button";
import { getUserById } from "../api/user";
import { Input } from "antd";
import { changePassword } from "../api/user";
import { ToastContainer, toast } from "react-toastify";
import CustomerOrder from "../components/CustomerOrder/AdminOrder";
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
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
  const [formChange, setFormChange] = useState({
    passold: "",
    passnew: "",
    passconfirm: "",
  });
  const [message, setMessage] = useState("");
  const getUser = async () => {
    await getUserById(sessionStorage.getItem("id")).then((res) => {
      setUser(res);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  // Xử lý khi người dùng chọn một tab
  const handleMenuClick = (e) => {
    setActiveTab(e.key);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormChange({ ...formChange, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formChange);
    console.log(user);
    if (formChange.passold === "") {
      setMessage("Vui lòng nhập mật khẩu hiện tại");
    } else if (formChange.passold !== user.password) {
      setMessage("Mật khẩu hiện tại không đúng");
    } else if (formChange.passnew === "") {
      setMessage("Vui lòng nhập mật khẩu mới");
    } else if (formChange.passconfirm === "") {
      setMessage("Vui lòng nhập lại mật khẩu mới");
    } else if (formChange.passnew !== formChange.passconfirm) {
      setMessage("Mật khẩu nhập lại không khớp");
    } else {
      const data = {
        id: user.id,
        passnew: formChange.passnew,
      };
      await changePassword(data)
        .then((res) => {
          if (res === true) {
            toast.success("Thay đổi mật khẩu thành công !", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          } else {
            toast.success("Thay đổi mật khẩu thất bại !", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          }
        })
        .catch((err) => {
          toast.success("Có lỗi xảy ra vui lòng thử lại !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        });
    }
  };
  // Nội dung cho từng tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileCard />;
      case "changepass":
        return (
          <div className="info-section">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Mật khẩu cũ:</label>
                <Input.Password
                  name="passold"
                  value={formChange.passold}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Mật khẩu mới:</label>
                <Input.Password
                  name="passnew"
                  value={formChange.passnew}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu mới</label>
                <Input.Password
                  name="passconfirm"
                  value={formChange.passconfirm}
                  onChange={handleChange}
                />
              </div>
              {message !== "" ? (
                <div style={{ marginBottom: 10 }}>{message}</div>
              ) : (
                ""
              )}
              <Button size="sm" type="submit">
                Lưu
              </Button>
            </form>
          </div>
        );
      case "order":
        return <CustomerOrder />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Sider
        collapsible
        style={{ background: "#fff" }}
        className="custom-sider"
      >
        <Menu theme="light" mode="inline" onClick={handleMenuClick}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Tài Khoản Của Tôi">
            <Menu.Item key="profile">Hồ Sơ</Menu.Item>
            <Menu.Item key="changepass">Đổi mật khẩu</Menu.Item>
            {/* <Menu.Item key="order">Đơn hàng của tôi</Menu.Item> */}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        {/* <Header style={{ background: "#fff", padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
}

export default UserProfile;
