import React, { useEffect, useState } from "react";
import { registerUser, signUpUser } from "../api/user";
import RegistrationSuccess from "./RegistrationSuccess ";
import Spinner from "../components/Spiner";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user-modal/userModalSlice";
import SuccessRegister from "../components/SuccessRegister";

const LoginSignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [checkReg, setCheckReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkRegister, setCheckRegister] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkActive, setCheckActive] = useState(false);
  const [checkExis, setCheckExist] = useState(false);
  const [checkSuccess, setCheckSuccess] = useState(false);
  //const [loginError, setLoginError] = useState(false);
  console.log(loading);
  const history = useHistory();
  const checkLoginErrors = () => {
    if (!usernameLogin) {
      setLoginError("Vui lòng nhập tên đăng nhập");
    } else if (!passwordLogin) {
      setLoginError("Vui lòng nhập mật khẩu");
    } else {
      setLoginError("");
    }
  };
  const dispatch = useDispatch();
  const checkSignupErrors = () => {
    if (!fullname) {
      setSignupError("Vui lòng nhập họ và tên");
    } else if (!phone) {
      setSignupError("Vui lòng nhập số điện thoại");
    } else if (!address) {
      setSignupError("Vui lòng nhập địa chỉ");
    } else if (!email) {
      setSignupError("Vui lòng nhập email");
    } else if (!username) {
      setSignupError("Vui lòng nhập tên đăng nhập");
    } else if (!password) {
      setSignupError("Vui lòng nhập mật khẩu");
    } else if (!passwordConfirm) {
      setSignupError("Vui lòng nhập lại mật khẩu");
    } else if (passwordConfirm !== password) {
      setSignupError("Mật khẩu không trùng nhau, hãy nhập lại");
    } else {
      setSignupError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usernameLogin) {
      setLoginError("Vui lòng nhập tên đăng nhập");
    } else if (!passwordLogin) {
      setLoginError("Vui lòng nhập mật khẩu");
    } else {
      setLoginError("");
    }
    setLoading(true);
    setCheckActive(false);
    setCheckLogin(false);
    setCheckExist(false);
    let checkUser = false;
    const user = await signUpUser(usernameLogin);
    console.log(user);
    if (usernameLogin === user.username && passwordLogin === user.password) {
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
          if (user.idRole === 2) {
            setTimeout(() => {
              history.push("/admin");
            }, 2000);
          } else {
            setTimeout(() => {
              history.push("/");
            }, 2000);
          }
        } else {
          setLoginError(
            "Tài khoản chưa được kích hoạt, vui lòng kiểm tra gmail để kích hoạt"
          );
          setCheckActive(true);
          setLoading(false);
        }
      } else {
        setTimeout(() => {
          setLoading(false);
          setCheckLogin(true);
          setLoginError(
            "Tên đăng nhập hoặc mật khẩu không đúng, vui lòng kiểm tra lại"
          );
          console.log("Tài khoản chưa tồn tại");
        }, 2000);
      }
    } else {
      setLoading(false);
      setLoginError("Tài khoản chưa tồn tại, vui lòng đăng ký");
      setCheckExist(true);
      console.log("Không có");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    checkSignupErrors();
    if (signupError === "") {
      const data = {
        username: username,
        password: password,
        email: email,
        fullname: fullname,
        address: address,
        phone: phone,
        status: 1,
        idRole: 1,
      };
      await registerUser(data).then((res) => {
        if (typeof res === "number") {
          setCheckReg(true);
          history.push("/successsignup");
          setCheckSuccess(true);
          console.log(checkReg);
        } else {
          setSignupError(res);
        }
      });
    }
  };

  useEffect(() => {
    const pwShowHide = document.querySelectorAll(".eye-icon");
    const links = document.querySelectorAll(".link");
    const forms = document.querySelector(".forms");

    // Xử lý hiển thị hoặc ẩn mật khẩu
    pwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener("click", () => {
        let pwFields =
          eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach((password) => {
          if (password.type === "password") {
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
          }
          password.type = "password";
          eyeIcon.classList.replace("bx-show", "bx-hide");
        });
      });
    });

    // Xử lý chuyển đổi giữa form đăng nhập và form đăng ký
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); // Ngăn form submit

        forms.classList.toggle("show-signup");
      });
    });
  }, []);

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Đăng nhập</header>
          <form onSubmit={handleLogin}>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Username"
                className="input"
                value={usernameLogin}
                onChange={(e) => setUsernameLogin(e.target.value)}
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={passwordLogin}
                onChange={(e) => setPasswordLogin(e.target.value)}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="form-link">
              <a href="#" className="forgot-pass">
                Quên mật khẩu
              </a>
            </div>

            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
            {loginError && <div className="errorSignUp">{loginError}</div>}
          </form>

          <div className="form-link">
            <span>
              Bạn chưa có tài khoản?{" "}
              <a href="#" className="link signup-link">
                Đăng ký
              </a>
            </span>
          </div>
        </div>
      </div>
      {loading ? <Spinner /> : <></>}
      <div className="form signup" style={{ marginTop: 50 }}>
        <div className="form-content">
          <header>Đăng ký</header>
          <form onSubmit={handleSignup}>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Họ và tên"
                className="input"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Số điện thoại"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Địa chỉ"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Mật khẩu"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>
            <div className="field button-field">
              <button type="submit" onClick={handleSignup}>
                Đăng ký
              </button>
              {signupError && <div className="errorSignUp">{signupError}</div>}
            </div>
          </form>

          <div className="form-link" style={{ marginTop: 50 }}>
            <span>
              Bạn đã có tài khoản?{" "}
              <a href="#" className="link login-link">
                Đăng nhập
              </a>
            </span>
          </div>
        </div>
      </div>
      {checkReg ? <RegistrationSuccess /> : <></>}
    </section>
  );
};

export default LoginSignupForm;
