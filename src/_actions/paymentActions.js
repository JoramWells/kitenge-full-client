import axios from "axios";
import {
  CONFIRM_PAYMENT_FAIL,
  CONFIRM_PAYMENT_REQUEST,
  CONFIRM_PAYMENT_SUCCESS,
  GET_PAYMENT_FAIL,
  GET_PAYMENT_REQUEST,
  GET_PAYMENT_SUCCESS,
  MAKE_PAYMENT_FAIL,
  MAKE_PAYMENT_REQUEST,
  MAKE_PAYMENT_SUCCESS,
} from "../_constants/paymentsConstant";
const Cookie = require("js-cookie");

const makePayment = (phone, amount) => async (dispatch) => {
  dispatch({ type: MAKE_PAYMENT_REQUEST, payload: { phone, amount } });
  try {
    await axios.post("/mpes/stk", { phone, amount })
    .then(response=>{
      console.log(response)
      Cookie.set('paymentDetails', JSON.stringify(response.data),{
        expires:1/28800

      })
    dispatch({ type: MAKE_PAYMENT_SUCCESS, payload: response.data });

    }).catch(err=>console.log(err))
  } catch (error) {
    dispatch({ type: MAKE_PAYMENT_FAIL, payload: error.message });
  }
};

const confirmPayment = (requestID) => async (dispatch) => {
  dispatch({ type: CONFIRM_PAYMENT_REQUEST, payload: { requestID } });
  try {
    await axios.post("/query", { requestID })
    .then(response=>{
    dispatch({ type: CONFIRM_PAYMENT_SUCCESS, payload: response.data });
    Cookie.set('confirmPaid', JSON.stringify(response.data),{
      expires:1/28800

    })
    }).catch(err=>{
      dispatch({ type: CONFIRM_PAYMENT_FAIL, payload: err });

    })
  } catch (error) {
    dispatch({ type: CONFIRM_PAYMENT_FAIL, payload: error.message });
  }
};

const paymentDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PAYMENT_REQUEST });
    const { data } = await axios.get("/payment/orders");
    dispatch({ type: GET_PAYMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PAYMENT_FAIL, payload: error.message });
  }
};

export { makePayment, confirmPayment, paymentDetails };
