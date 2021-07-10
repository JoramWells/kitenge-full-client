import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  GOOGLE_AUTH,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../_constants/userConstants";
import axios from "axios";
import Cookie from "js-cookie";

const signin = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: dataToSubmit });
  try {
    await axios
      .post("/user/login", dataToSubmit)
      .then((response) => {
        if (response.data.success === false) {
          dispatch({ type: USER_SIGNIN_FAIL, payload: "Email not found" });
          Cookie.set("userFailure", JSON.stringify(response.data), {
            expires: 1 / 28800,
          });
        } else {
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
          Cookie.set("userInfo", JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
      });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register =
  (name, email, password, avatar, phone, address) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password, avatar, phone, address },
    });
    try {
      await axios
        .post("/user/register", {
          name,
          email,
          password,
          avatar,
          phone,
          address,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success === false) {
            dispatch({
              type: USER_REGISTER_FAIL,
              payload: response.data,
            });
            Cookie.set("userFailure", JSON.stringify(response.data), {
              expires: 1 / 28800,
            });
          } else {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
            Cookie.set("userInfo", JSON.stringify(response.data));
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  };

const updateUser =
  (userID, username, email, password, avatar, phone, address) =>
  async (dispatch, getState) => {
    dispatch({
      type: USER_UPDATE_REQUEST,
      payload: { userID, username, password, avatar, phone, address },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    await axios
      .put(
        `/me/${userID}`,
        { userID, username, email, password, avatar, phone, address },
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      )
      .then((response) => {
        dispatch({ type: USER_UPDATE_SUCCESS, payload: response.data });
      })
      .catch((error) =>
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message })
      );
  };

const saveUser = (name, email, avatar, token) => (dispatch) => {
  dispatch({
    type: GOOGLE_AUTH,
    payload: { name, email, avatar, token },
  });
};
export { signin, register, saveUser,updateUser };
