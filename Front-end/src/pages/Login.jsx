import { useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser } from "../api/product";

import Spinner from "../components/Spiner";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user-modal/userModalSlice";
import { signUpUser } from "../api/user";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [checkRegister, setCheckRegister] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkActive, setCheckActive] = useState(false);
  const [checkExis, setCheckExist] = useState(false);
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();

  const clickLogin = async () => {
    setLoading(true);
    setCheckActive(false);
    setCheckLogin(false);
    setCheckExist(false);
    let checkUser = false;
    const user = await signUpUser(username);
    console.log(user);
    if (username === user.username && password === user.password) {
      checkUser = true;
    }
    if (user) {
      if (checkUser) {
        if (user.status === 2) {
          sessionStorage.setItem("id", user.id);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("fullname", user.fullname);
          sessionStorage.setItem("address", user.address);
          sessionStorage.setItem("phone", user.phone);
          sessionStorage.setItem("password", password);
          dispatch(setUser({ name: user.username, role: user.idRole }));
          setUsername(username);
          setPassword(password);
          console.log(user);
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else {
          setCheckActive(true);
          setLoading(false);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
          setCheckLogin(true);
          console.log("Tài khoản chưa tồn tại");
        }, 2000);
      }
    } else {
      setLoading(false);
      setCheckExist(true);
      console.log("Không có");
    }
  };

  const handleRegister = () => {
    setCheckRegister(true);
  };

  const handleLogin = () => {
    setCheckRegister(false);
  };

  const handleSignUp = async () => {
    const res = await signUpUser({
      hoTen: fullname,
      tenDangNhap: username,
      matKhau: password,
      email: email,
      sdt: phone,
      diaChi: address,
      role: 1,
    });
    if (res) {
      setCheckRegister(false);
    }
  };
  return (
    <>
      {checkRegister ? (
        <div className="containerRegister">
          <div className="col">
            <div className="formLogin">
              <h1>ĐĂNG KÝ</h1>
              <h3>Họ và tên</h3>
              <input
                type="text"
                className="username"
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
              />
              <br />

              <h3>Tên đăng nhập</h3>
              <input
                type="text"
                className="username"
                onChange={onChangeUsername}
                value={username}
              />
              <br />
              <h3>Mật khẩu</h3>
              <input
                type="password"
                className="password"
                onChange={onChangePassword}
                value={password}
              />

              <br />
              <h3>Email</h3>
              <input
                type="text"
                className="username"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <br />
              <h3>Số điện thoại</h3>
              <input
                type="text"
                className="username"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <br />
              <h3>Địa chỉ</h3>
              <input
                type="text"
                className="username"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
              <br />
              <button onClick={handleSignUp} style={{ cursor: "pointer" }}>
                Đăng ký
              </button>
              <br />
              <p onClick={handleLogin} style={{ cursor: "pointer" }}>
                Bạn đã có tài khoản? Đăng nhập
              </p>
            </div>
          </div>
        </div>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="containerLogin">
          <div className="col">
            <div className="formLogin">
              <h1>ĐĂNG NHẬP</h1>
              <h3>Tên đăng nhập</h3>
              <input
                type="text"
                className="username"
                onChange={onChangeUsername}
                value={username}
              />
              <br />
              <h3>Mật khẩu</h3>
              <input
                type="password"
                className="password"
                onChange={onChangePassword}
                value={password}
              />
              <p className={`${checkLogin ? "errorLogin" : "Normal"}`}>
                Tên đăng nhập hoặc mật khẩu không đúng
              </p>
              <p className={`${checkActive ? "errorLogin" : "Normal"}`}>
                Tài khoản chưa được kích hoạt, vui lòng kiểm tra gmail!
              </p>
              <p className={`${checkExis ? "errorLogin" : "Normal"}`}>
                Tài khoản không tồi tại, vui lòng đăng ký
              </p>
              <br />
              <button onClick={clickLogin} style={{ cursor: "pointer" }}>
                Đăng nhập
              </button>
              <br />
              <p onClick={handleRegister} style={{ cursor: "pointer" }}>
                Đăng ký tài khoản mới
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
