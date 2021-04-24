import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    GOOGLE_AUTH,
  } from "../_constants/userConstants";
  const axios = require("axios");
  const Cookie = require("js-cookie");
  
  const signin = (dataToSubmit) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: dataToSubmit });
    try {
      await axios.post("/user/login", dataToSubmit)
      .then(response=>{
        if(response.data.success == 0){
      dispatch({ type: USER_SIGNIN_FAIL, payload: 'Email not found' });
      Cookie.set("userFailure", JSON.stringify(response.data),{
        expires:1/28800
      })
        }else{
              dispatch({ type: USER_SIGNIN_SUCCESS, payload: response.data });
      Cookie.set("userInfo", JSON.stringify(response.data));
        }
      })
      .catch(err=>{
        console.log(err)
      })
  
  
    } catch (error) {
      dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
  };
  
  const register = (name, email, password, avatar, phone, address) => async (
    dispatch
  ) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password, avatar, phone, address },
    });
    try {
      await axios.post("/user/register", {
        name,
        email,
        password,
        avatar,
        phone,
        address,
      }).then(response=>{
        console.log(response.data)
        if(response.data.success == 0){
      dispatch({ type: USER_REGISTER_FAIL, payload: 'User already exists' });
      Cookie.set("userFailure", JSON.stringify(response.data),{
        expires:1/28800
      })
        }else{
          dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
          Cookie.set("userInfo", JSON.stringify(response.data))
        }
  
  
  
      }
        
        ).catch(err=>console.log(err))
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  };
  
  const saveUser = (name, email, avatar, token) => (dispatch) => {
    dispatch({
      type: GOOGLE_AUTH,
      payload: { name, email, avatar, token },
    });
  };
  export { signin, register, saveUser };
  