const initialState = {
  page: 1,
  resourceData: [],
  searchTerm: "",
  searchData: [],
  loading: false,
  total: 0,
  warning: "",
};

const resourceListing = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_RESOURCE_DATA":
      return {
        page: state.page,
        searchTerm: state.searchTerm,
        searchData: state.searchData,
        loading: state.loading,
        total: state.total,
        warning: state.warning,
        resourceData: payload.resourceData,
      };
    case "SET_SEARCH_DATA":
      return {
        page: state.page,
        searchTerm: state.searchTerm,
        searchData: payload.searchData,
        loading: state.loading,
        total: state.total,
        warning: state.warning,
        resourceData: state.resourceData,
      };
    case "SET_TOTAL":
      return {
        page: state.page,
        searchTerm: state.searchTerm,
        searchData: state.searchData,
        loading: state.loading,
        total: payload.total,
        warning: state.warning,
        resourceData: state.resourceData,
      };
    case "SET_PAGE":
      return {
        page: payload.page,
        searchTerm: state.searchTerm,
        searchData: state.searchData,
        loading: state.loading,
        total: state.total,
        warning: state.warning,
        resourceData: state.resourceData,
      };
    case "SET_SEARCH_TERM":
      return {
        page: state.page,
        searchTerm: payload.searchTerm,
        searchData: state.searchData,
        loading: state.loading,
        total: state.total,
        warning: state.warning,
        resourceData: state.resourceData,
      };
    case "SET_LOADING":
      return {
        page: state.page,
        searchTerm: state.searchTerm,
        searchData: state.searchData,
        loading: payload.loading,
        total: state.total,
        warning: state.warning,
        resourceData: state.resourceData,
      };
    case "SET_WARNING":
      return {
        page: state.page,
        searchTerm: state.searchTerm,
        searchData: state.searchData,
        loading: state.loading,
        total: state.total,
        warning: payload.warning,
        resourceData: state.resourceData,
      };
    default:
      return state;
  }
};

export default resourceListing;
