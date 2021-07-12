import {
  GOOGLE_AUTH,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
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

const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loadingUser: true };
    case USER_UPDATE_SUCCESS:
      return { loadingUser: false, success: true, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loadingUser: false, errorUser: action.payload };
    default:
      return state;
  }
};

const listUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// function saveAllUser(state = {}, action) {
//   switch (action.type) {
//     case GOOGLE_AUTH:
//       return { ...state, goole_user: action.payload };
//     default:
//       return state;
//   }
// }

export {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
  listUserReducer,
  userGoogleReducer,
};
