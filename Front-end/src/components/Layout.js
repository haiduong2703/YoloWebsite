import React, { useEffect } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
//import HeaderAdmin from "./HeaderAdmin";
import Footer from "./Footer";

import ProductViewModal from "./ProductViewModal";

import Routes from "../routes/Routes";
import { getUser } from "../api/product";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user-modal/userModalSlice";
import RoutesAdmin from "../routes/RoutesAdmin";
import { signUpUser } from "../api/user";

const Layout = () => {
  const userName = sessionStorage.getItem("username");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  let checkUser = true;
  if (user.role === 2) {
    checkUser = false;
  }
  // const user = sessionStorage.getItem("user");

  // console.log(user)
  // let checkUser = true;
  // if (user.role === 2) {
  //   console.log(user)
  //   console.log("abc");
  //   checkUser = false;
  // }

  // useEffect(() => {
  //   const handleLogin = async () => {
  //     if (userName) {
  //       const userLogin = await getUser(userName);
  //       dispatch(
  //         setUser({ name: userLogin.tenDangNhap, role: userLogin.role })
  //       );
  //       console.log("userLogin: ", userLogin);
  //     }
  //   };
  //   handleLogin();
  // }, []);

  return (
    <BrowserRouter>
      {checkUser ? (
        <Route
          render={(props) => (
            <div>
              {<Header {...props} />}
              <div className="container">
                <div className="main">
                  <Routes />
                </div>
              </div>
              <Footer />
              <ProductViewModal />
            </div>
          )}
        />
      ) : (
        <Route
          render={(props) => (
            <div>

              <RoutesAdmin />

              {/* <Footer /> */}
              { }
            </div>
          )}
        />
      )}
    </BrowserRouter>
  );
};
export default Layout;
