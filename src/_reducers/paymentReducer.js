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
  
  function paymentReducer(state = {}, action) {
    switch (action.type) {
      case MAKE_PAYMENT_REQUEST:
        return { loading: true };
      case MAKE_PAYMENT_SUCCESS:
        return { loading: false, paymentDetails: action.payload };
      case MAKE_PAYMENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function confirmPaymentReducer(state = {}, action) {
    switch (action.type) {
      case CONFIRM_PAYMENT_REQUEST:
        return { loadingDetails: false };
      case CONFIRM_PAYMENT_SUCCESS:
        return { loadingDetails: false, confirmPaymentDetails: action.payload };
      case CONFIRM_PAYMENT_FAIL:
        return { loadingDetails: false, errorDetails: action.payload };
      default:
        return state;
    }
  }
  
  function paymentListReducer(state = { payments: [] }, action) {
    switch (action.type) {
      case GET_PAYMENT_REQUEST:
        return { loading: true };
      case GET_PAYMENT_SUCCESS:
        return { loading: false, payments: action.payload };
      case GET_PAYMENT_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  export { paymentReducer, confirmPaymentReducer, paymentListReducer };
  