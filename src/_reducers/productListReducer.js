const {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  USER_PRODUCTS_REQUEST,
  USER_PRODUCTS_SUCCESS,
  USER_PRODUCTS_FAIL,
} = require("../_constants/productConstants");

function productListReducer(state = { posts: [] }, action) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, posts: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function categoryListReducer(state = { products: [] }, action) {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loadingCategory: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return { loadingCategory: false, products: action.payload };
    case PRODUCT_CATEGORY_FAIL:
      return { loadingCategory: false, errorCategory: action.payload };
    default:
      return state;
  }
}
function categoryListsReducer(state = { posts: [] }, action) {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, posts: action.payload };
    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productDetailReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productSaveReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_SAVE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function productUpdateReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loadingUpdate: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loadingUpdate: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loadingUpdate: false, errorUpdate: action.payload };
    default:
      return state;
  }
}

function productDeleteReducer(state = { product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

const myProductsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case USER_PRODUCTS_REQUEST:
      return { loadingProducts: true };
    case USER_PRODUCTS_SUCCESS:
      return { loadingProducts: false, success: true, items: action.payload };
    case USER_PRODUCTS_FAIL:
      return { loadingProducts: false, errorProducts: action.payload };
    default:
      return state;
  }
};

export {
  productListReducer,
  productDetailReducer,
  productSaveReducer,
  categoryListReducer,
  categoryListsReducer,
  productUpdateReducer,
  productDeleteReducer,
  myProductsReducer
};
