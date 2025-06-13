const INITIAL_STATE = {
  products: [],
  isFetching: false,
  error: false,
};

const brandReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_BRANDS_START":
      return {
        ...state,
        isFetching: true,
      };
    case "GET_BRANDS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        isFetching: false,
      };
    case "GET_BRANDS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default brandReducer;
