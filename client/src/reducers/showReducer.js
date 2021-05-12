const initialState = {
  loading: false,
  resourceData: [],
};

const showReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_SINGLE_RESOURCE":
      return {
        resourceData: payload.resourceData,
        loading: state.loading,
      };
    case "SET_LOADING":
      return {
        resourceData: state.resourceData,
        loading: payload.loading,
      };
    default:
      return state;
  }
};

export default showReducer;
