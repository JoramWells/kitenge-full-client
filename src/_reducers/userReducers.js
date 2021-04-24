import {
    GOOGLE_AUTH,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
  } from "../_constants/userConstants";
  
  function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loadingUser: true };
      case USER_SIGNIN_SUCCESS:
        return { loadingUser: false, userInfo: action.payload };
      case USER_SIGNIN_FAIL:
        return { loadingUser: false, errorUser: action.payload };
      default:
        return state;
    }
  }
  
  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  }
  
  function userGoogleReducer(state = {}, action) {
    switch (action.type) {
      case GOOGLE_AUTH:
        return { ...state, google_user: action.payload };
      default:
        return state;
    }
  }
  
  // function saveAllUser(state = {}, action) {
  //   switch (action.type) {
  //     case GOOGLE_AUTH:
  //       return { ...state, goole_user: action.payload };
  //     default:
  //       return state;
  //   }
  // }
  
  export { userSigninReducer, userRegisterReducer, userGoogleReducer };
  