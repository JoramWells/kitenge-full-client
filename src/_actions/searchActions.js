import {
  SEARCH_QUERY_FAIL,
  SEARCH_QUERY_REQUEST,
  SEARCH_QUERY_SUCCESS,
} from "../_constants/searchConstants";
import axios from "axios";
import Cookie from 'js-cookie'


const searchItems = (dataToSubmit) => async (dispatch) => {
  dispatch({ type: SEARCH_QUERY_REQUEST, payload: dataToSubmit });
  try {
    await axios
      .post("/nancy/search", dataToSubmit)
      .then((response) => {
        dispatch({ type: SEARCH_QUERY_SUCCESS, payload: response.data });
        Cookie.set("searchedItems", JSON.stringify(response.data))
      })
      .catch((err) => {
        dispatch({ type: SEARCH_QUERY_FAIL, payload: err.message });

      });
  } catch (error) {
    dispatch({ type: SEARCH_QUERY_FAIL, payload: error.message });
  }
};

export { searchItems };
