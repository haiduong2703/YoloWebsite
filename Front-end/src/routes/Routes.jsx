import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin/Admin";
import ProfileUser from "../pages/ProfileUser";
import NotFoundPage from "../pages/NotFoundPage";
import UserProfile from "../pages/InFor";
import CatalogSearch from "../pages/CatalogSearch";
import { useSelector } from "react-redux";
import ThanhToan from "../pages/ThanhToan";
import PhanHoi from "../pages/PhanHoi";
import Offline from "../pages/Offline";
import Success from "../pages/Success";
import LoginRegister from "../pages/LoginRegister";
import ContactPage from "../pages/ContactNew";
import PaymentForm from "../pages/CheckOut";
import ProfileCard from "../pages/Information";
import ChatBot from "../components/ChatBox";
import SuccessRegister from "../components/SuccessRegister";
import SuccessCOD from "../components/SuccessCOD";
const Routes = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/catalog/:id" component={Product} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/catalog/:keysearch" component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/login" component={LoginRegister} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/infor" component={UserProfile} />
      <Route path="/catalogSearch" component={CatalogSearch} />
      <Route path="/thanhtoan" component={PaymentForm} />
      <Route path="/phanhoi" component={PhanHoi} />
      <Route path="/offline" component={Offline} />
      <Route path="/success" component={Success} />
      <Route path="/successsignup" component={SuccessRegister} />
      <Route path="/successcod" component={SuccessCOD} />
      {user.role === 2 ? (
        <Route path="/admin" component={Admin} />
      ) : (
        <Route path="/admin" component={NotFoundPage} />
      )}
      <Route path="/profile" component={ProfileUser} />
    </Switch>
  );
};

export default Routes;
