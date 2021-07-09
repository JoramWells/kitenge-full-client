import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./Login/Register";
import Login from "./Login/Login";
import AddProduct from "./Products/AddProduct";
import ManageProducts from "./Products/ManageProducts";
import ProductDetail from "./Products/ProductDetail";
import CartScreen from "./Cart/CartScreen";
import ShippingScreen from "./Cart/ShippingScreen";
import HomeRoutes from "./HomeRoutes";
import DesktopNavbarMobile from "./DesktopNavbarMobile";
import Product from "./Products/Product";
import ScrollTop from "./Generic/ScrollTop";
import SearchedItems from "./Products/SearchedItems";
// import Header from "./header/Header";
import MapComponent from './maps/MapComponent'
import Scrollable from "./Products/Scrollable";

function App() {
  return (
    <>
      <Router>
        <ScrollTop />
        <DesktopNavbarMobile />

        <Switch>
          <Route path="/" exact component={HomeRoutes} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/products/add" exact component={AddProduct} />
          <Route path="/produc/manage" exact component={ManageProducts} />
          <Route path="/product-detail/:id?" exact component={ProductDetail} />
          <Route path="/product-info/:category" exact component={Product} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" exact component={ShippingScreen} />
          <Route path="/searched" exact component={SearchedItems}  />
          <Route path="/scrollable" exact component={Scrollable}  />
          <Route path="/map" exact component={MapComponent}  />


        </Switch>
      </Router>
    </>
  );
}

export default App;
