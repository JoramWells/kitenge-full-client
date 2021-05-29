import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  categoryListReducer,
  categoryListsReducer,
//   productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productSaveReducer,
  productUpdateReducer,
} from "./_reducers/productListReducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  // userGoogleReducer,
  userRegisterReducer,
  userSigninReducer,
} from "./_reducers/userReducers";
import { cartReducer } from "./_reducers/cartReducers";
import {
  confirmPaymentReducer,
  paymentListReducer,
  paymentReducer,
} from "./_reducers/paymentReducer";
import { likedReducer } from "./_reducers/likedReducer";
import { searchReducer } from "./_reducers/searchReducer";

const cartItems = Cookie.getJSON("cartItems") || [];
const likedItems = Cookie.getJSON("likedItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = { cart: { cartItems }, userSignin: { userInfo },liked:{likedItems} };

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  cart: cartReducer,
  liked:likedReducer,
  searchQuery:searchReducer,
  categoryList: categoryListReducer,
  categoryLists: categoryListsReducer,
  productUpdate: productUpdateReducer,
//   productDelete: productDeleteReducer,
//   googleUser: userGoogleReducer,
  payment: paymentReducer,
  confirmDetails: confirmPaymentReducer,
  paymentList: paymentListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
