import axios from "axios";
import Cookie from "js-cookie";
import {
  ADD_TO_CART,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
  REMOVE_FROM_CART,
} from "../_constants/cartConstants";

const addToCart = (productId, qty, username, phone) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.get(
      `/product/${productId}`
    );
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.id,
        product_name: data.product_name,
        image: data.image,
        price: data.price,
        stock: data.stock,
        qty,
        username,
        phone,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (address, city, postal_code) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING,
    payload: { address, city, postal_code },
  });
};

const savePayment = (address, city, postal_code) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: { address, city, postal_code },
  });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
