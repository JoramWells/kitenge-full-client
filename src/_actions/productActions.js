import axios from "axios";
import {
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../_constants/productConstants";

const listProducts = (page) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/products?page=${page}&size=8`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST });
    const { data } = await axios.get("/allcategory/");
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const categoryProduct = (category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST });
    const { data } = await axios.get("/category/" + category);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get("/product/" + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProduct = (id) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });

  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: id });
    const { data } = await axios.delete("/product/delete/" + id, {
      headers: {
        Authorization: "Bearer" + userInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const saveProduct =
  (name, price, selling_price, stock, userId, image, category, description) =>
  async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_SAVE_REQUEST,
      payload: {
        name,
        price,
        selling_price,
        stock,
        userId,
        image,
        category,
        description,
      },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await axios
        .post(
          `/productz/add`,
          {
            name,
            price,
            selling_price,
            stock,
            userId,
            image,
            category,
            description,
          },
          {
            headers: {
              Authorization: "Bearer" + userInfo.token,
            },
          }
        )
        .then((response) => {
          dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: response.data });
        })
        .catch((error) => {
          dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
        });
    } catch (error) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };

const updateProduct =
  (id, name, price, stock, shop, image, category, description) =>
  async (dispatch, getState) => {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
      payload: { id, name, price, stock, shop, image, category, description },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await axios
        .put(
          `/product/add/${id}`,
          { id, name, price, stock, shop, image, category, description },
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: response.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.message });
    }
  };

export {
  listProducts,
  detailsProduct,
  saveProduct,
  categoryProduct,
  updateProduct,
  deleteProduct,
  listCategory,
};
