import {  LIKE_SAVE_FAILURE, LIKE_SAVE_REQUEST, LIKE_SAVE_SUCCESS } from "../_constants/cartConstants";

function likedReducer(
    state = { likedItems: []},
    action
  ) {
    switch (action.type) {
      case LIKE_SAVE_REQUEST:
        return{loadingLike:true}
      case LIKE_SAVE_SUCCESS:
        return {loadingLike:false,success:true,like:action.payload}
      case LIKE_SAVE_FAILURE:
        return {loadingLike: false,errorLike: action.payload}
      default:
        return state;
    }
  }
  export {likedReducer}
  