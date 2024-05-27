import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/Logo-2.png";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/user-modal/userModalSlice";
import { ToastContainer } from "react-toastify";
import searchicon from "../assets/images/searchicon.png";
import "react-toastify/dist/ReactToastify.css";
import MessengerSDK from "./MessageSDK";
import SearchBar from "./Search";
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog?keysearch",
  },

  {
    display: "Liên hệ",
    path: "/contact",
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  console.log(pathname);
  const activeNav = mainNav.findIndex((e) => e.path === pathname);

  const headerRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  let checkUser = true;

  const user = useSelector((state) => state.user);
  const onChangeKeyWord = (e) => {
    setKeyword(e.target.value);
  };
  if (user.role === 2) {
    // checkUser = false;
  }

  const dispatch = useDispatch();

  // Hàm xử lý khi click vào biểu tượng tìm kiếm

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");

  // const handleNavigate = () => {
  //   if (sessionStorage.getItem("username") !== null) {
  //     if (user?.role === 2) {
  //       history.push("/admin");
  //     } else {
  //       toast.error("Chức năng này chỉ dành cho admin!", {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     }
  //   } else {
  //     history.push("/login");
  //   }
  // };
  const handleSearch = () => {
    sessionStorage.setItem("keyword", keyword);
    console.log(keyword);
    history.push("/catalogSearch");
  };
  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(removeUser());
    history.push("/");
  };

  return checkUser ? (
    <div className="header" ref={headerRef}>
      <div className="container">
        <div className="header__logo">
          <Link
            to="/"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="header__menu">
          <div className="header__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__left" ref={menuLeft}>
            <div className="header__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {mainNav.map((item, index) => (
              <div
                key={index}
                className={`header__menu__item header__menu__left__item ${
                  index === activeNav ? "active" : ""
                }`}
                onClick={menuToggle}
              >
                <Link to={item.path}>
                  <span>{item.display}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="header__menu__right">
            <div className="header__menu__item header__menu__right_item">
              <div className="header__menu__item__search-input">
                <SearchBar />
              </div>
            </div>
            <div className="header__menu__item header__menu__right_item">
              <Link to="/cart">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </div>

            <div className="header__menu__item header__menu__right_item">
              {sessionStorage.getItem("username") ? (
                <Link to="/infor">
                  <i className="bx bx-user"></i>
                </Link>
              ) : (
                <Link to="/login">
                  <i className="bx bx-user"></i>
                </Link>
              )}
            </div>
            <div className="header__menu__item header__menu__right_item">
              {sessionStorage.getItem("username") ? (
                <i
                  onClick={handleLogout}
                  className="bx bx-log-out"
                  style={{ cursor: "pointer" }}
                ></i>
              ) : (
                <div className="header__menu__item header__menu__right_item">
                  <Link to="/login">
                    <i className="bx bx-log-in"></i>
                  </Link>
                </div>
              )}
            </div>
            {/* <div className="header__menu__item header__menu__right_item">
              <Link to="/login">
                <i className="bx bx-log-in"></i>
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  ) : (
    <></>
  );
};

export default Header;
