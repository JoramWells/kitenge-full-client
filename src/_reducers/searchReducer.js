import { SEARCH_QUERY_FAIL, SEARCH_QUERY_REQUEST, SEARCH_QUERY_SUCCESS } from "../_constants/searchConstants";
  
  function searchReducer(state = {}, action) {
    switch (action.type) {
      case SEARCH_QUERY_REQUEST:
        return { loadingSearch: true };
      case SEARCH_QUERY_SUCCESS:
        return { loadingSearch: false, searchQuery: action.payload };
      case SEARCH_QUERY_FAIL:
        return { loadingSearch: false, errorSearch: action.payload };
      default:
        return state;
    }
  }
  

  
  export { searchReducer};
  