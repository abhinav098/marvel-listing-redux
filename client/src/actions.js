const setResourceData = (resourceData) => ({
  type: "SET_RESOURCE_DATA",
  payload: { resourceData },
});

const setSingleResource = (resourceData) => ({
  type: "SET_SINGLE_RESOURCE",
  payload: { resourceData },
});

const setSearchData = (searchData) => {
  return {
    type: "SET_SEARCH_DATA",
    payload: { searchData },
  };
};

const setLoading = (loading) => {
  return {
    type: "SET_LOADING",
    payload: { loading },
  };
};
const setWarning = (warning) => {
  return {
    type: "SET_WARNING",
    payload: { warning },
  };
};

const setTotal = (total) => {
  return {
    type: "SET_TOTAL",
    payload: { total },
  };
};

const setPage = (page) => {
  return {
    type: "SET_PAGE",
    payload: { page },
  };
};

const setSearchTerm = (searchTerm) => {
  return {
    type: "SET_SEARCH_TERM",
    payload: { searchTerm },
  };
};

module.exports = {
  setResourceData,
  setSearchData,
  setSingleResource,
  setSearchTerm,
  setPage,
  setTotal,
  setWarning,
  setLoading,
};
