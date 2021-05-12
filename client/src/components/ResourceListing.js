import axios from "axios";
import { useEffect } from "react";
import CharacterCard from "./Characters/CharacterCard";
import ComicCard from "./Comics/ComicCard";
import SeriesCard from "./Series/SeriesCard";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import actions from "../actions.js";

import { Grid, makeStyles, TextField } from "@material-ui/core";

import "../App.css";

import { styles } from "../cardStyle";

const { perPage, apiUrl } = require("../config");
const useStyles = makeStyles(styles);

const ResourceListing = (props) => {
  const classes = useStyles();
  const resource = props.resource;
  const dispatch = useDispatch();
  // fetch states from redux store
  const states = useSelector((state) => state.listingReducer);
  const {
    resourceData,
    page,
    searchTerm,
    searchData,
    warning,
    loading,
    total,
  } = states;

  let card = null;
  const totalPages = Math.ceil(total / perPage);
  let currentPageText = null;

  // set state in redux
  const setResourceData = (data) => {
    dispatch(actions.setResourceData(data.data.results));
  };
  const setSearchData = (data) => {
    dispatch(actions.setSearchData(data));
  };

  const setSearchTerm = (searchTerm) => {
    dispatch(actions.setSearchTerm(searchTerm));
  };

  const setLoading = (loading) => {
    dispatch(actions.setLoading(loading));
  };

  const setTotal = (total) => {
    dispatch(actions.setTotal(total));
  };

  const setWarning = (warning) => {
    dispatch(actions.setWarning(warning));
  };

  const setPage = (pageNumber) => {
    dispatch(actions.setPage(pageNumber));
  };

  useEffect(() => {
    const pageNum = props.match.params.page;
    if (totalPages > 0 && pageNum > totalPages) {
      redirectToNotFound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages, props.match.params.page]);

  useEffect(() => {
    async function fetchData() {
      try {
        setWarning("");
        let pagenum = parseInt(props.match.params.page, 10);
        if (Number.isNaN(pagenum)) {
          redirectToNotFound();
        } else {
          setLoading(true);
          const { data } = await axios.get(
            `${apiUrl}/${resource}/page/${pagenum}`
          );
          setResourceData(data, pagenum);
          setTotal(data.data.total);
        }
      } catch (e) {
        redirectToNotFound();
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.page, resource]);

  useEffect(
    () => {
      async function fetchData() {
        try {
          setWarning("");
          if (searchTerm.trim().length >= 3) {
            const { data } = await axios.get(
              `${apiUrl}/${resource}/search?searchTerm=${searchTerm}`
            );
            if (data.data.results.length) {
              setSearchData(data.data.results);
            } else {
              setSearchData(undefined);
              setWarning("No results found");
            }
          } else {
            setWarning("Enter atleast 3 characters");
          }
        } catch (e) {
          console.log(e);
          redirectToNotFound();
        } finally {
          setLoading(false);
        }
      }
      if (searchTerm) {
        setTimeout(() => {
          fetchData();
        }, 200);
      } else {
        setSearchData(undefined);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm, resource]
  );

  const recordCountMessage = () => {
    const from = (page - 1) * perPage + 1;
    let to = page * perPage;
    if (page === totalPages) {
      to = total;
    }
    return (
      <>
        Showing page <strong>{page}</strong> of {totalPages}, ({from} - {to}) of{" "}
        {total} records!
      </>
    );
  };

  const redirectToNotFound = () => {
    history.push("/404");
  };

  currentPageText = recordCountMessage();
  const history = useHistory();

  const handlePageChange = (event, value) => {
    setPage(value);
    let path = `/${resource}/page/${value}`;
    history.push(path);
  };

  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);
  };

  const buildCard = (record) => {
    let card;
    switch (resource) {
      case "comics":
        card = <ComicCard comic={record} key={record.id} />;
        break;
      case "characters":
        card = <CharacterCard character={record} key={record.id} />;
        break;
      case "series":
        card = <SeriesCard series={record} key={record.id} />;
        break;
      default:
    }
    return card;
  };

  if (searchData) {
    card =
      searchData &&
      searchData.map((record) => {
        return buildCard(record);
      });
  } else {
    card =
      resourceData &&
      resourceData.map((record) => {
        return buildCard(record);
      });
  }

  if (loading) {
    return (
      <div>
        <h1>{resource.toUpperCase()}</h1>
        <p>Loading ...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{resource.toUpperCase()}</h1>
        <TextField
          error={warning.length > 0}
          id="outlined-basic"
          autoComplete="off"
          type="search"
          size="small"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          // onChange={searchItems}
          helperText={warning}
        />
        <br />
        <br />
        {searchData ? (
          ""
        ) : (
          <Grid container className={classes.grid} spacing={2}>
            <Grid item xs={5}>
              <span>{currentPageText}</span>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <Pagination
                count={totalPages}
                shape="rounded"
                defaultPage={0}
                page={page}
                showFirstButton
                showLastButton
                variant="text"
                color="primary"
                boundaryCount={2}
                onChange={handlePageChange}
              />
            </Grid>
          </Grid>
        )}
        <br />
        <br />
        <Grid container className={classes.grid} spacing={5}>
          {card}
        </Grid>
      </div>
    );
  }
};

export default ResourceListing;
