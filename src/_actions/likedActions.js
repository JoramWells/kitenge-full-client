// import Cookie from "js-cookie";
import axios from "axios";
import {
  LIKE_SAVE_SUCCESS,
  LIKE_SAVE_FAILURE,
  LIKE_SAVE_REQUEST,
} from "../_constants/cartConstants";

const likedItem = (id, state) => async (dispatch) => {
  dispatch({ type: LIKE_SAVE_REQUEST, payload: { id, state } });
  try {
    await axios
      .put(`/product/likes/${id}`, { id,state })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: LIKE_SAVE_SUCCESS, payload: response.data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
    dispatch({ type: LIKE_SAVE_FAILURE, payload: error.message });
  }
};
export { likedItem };
