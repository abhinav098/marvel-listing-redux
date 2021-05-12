const express = require("express");
const router = express.Router();
const marvelService = require("../marvelURL");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

// get characters or comics or series based on resourceName argument
async function getResourceList(resourceName, options) {
  const page = options.page;
  try {
    const cached = await redis.get(`/${resourceName}/page/${page}`);
    if (cached) {
      const dataObject = JSON.parse(cached);
      return dataObject;
    } else {
      const { data } = await axios.get(marvelService.getUrl({ page, resourceName }));
      const resourceData = data.data;
      const stringifyData = JSON.stringify(resourceData);
      await redis.set(`/${resourceName}/page/${page}`, stringifyData)
      return resourceData;
    }
  } catch(e){
    throw new Error(e);
  }
}

// search characters or comics or series based on resourceName and searchTerm
async function searchResourceList(options) {
  try {
    const cached = await redis.get(`/${options.resourceName}/search?searchTerm=${options.searchTerm}`);
    if(cached){
      const dataObject = JSON.parse(cached);
      return dataObject;
    } else {
      const { data } = await axios.get(marvelService.getUrl(options));
      const resourceData = data.data;
      const stringifyData = JSON.stringify(resourceData);
      await redis.set(`/${options.resourceName}/search?searchTerm=${options.searchTerm}`, stringifyData)
      return resourceData;
    }
  } catch(e){
    throw new Error(e);
  }
}

// get single character, comic or series based on resourceName
async function getResource(resourceName) {
  try {
    const cached = await redis.get(`/${resourceName}`);
    if (cached) {
      const dataObject = JSON.parse(cached);
      return dataObject;
    } else {
      const { data } = await axios.get(marvelService.getUrl({resourceName}));
      const resourceData = data.data;
      const stringifyData = JSON.stringify(resourceData);
      await redis.set(`/${resourceName}`, stringifyData)
      return resourceData;
    }
  } catch(e){
    throw new Error(e);
  }
};

router.get("/characters/page/:page", async(req, res) => {
  const page = parseInt(req.params.page);
  try {
    if (isNaN(page))
      throw new Error("Page Not Found!");
    const options = { page: page }
    const resourceData = await getResourceList('characters', options);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("/characters/search", async(req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const options = {
      searchAttr: 'nameStartsWith',
      searchTerm,
      resourceName: 'characters'
    };
    const resourceData = await searchResourceList(options);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("/comics/page/:page", async(req, res) => {
  const page = parseInt(req.params.page);
  try {
    if (isNaN(page))
    throw new Error("Page Not Found!");
    const options = { page: page }
    const resourceData = await getResourceList('comics', options);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("/comics/search", async(req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const options = {
      searchAttr: 'titleStartsWith',
      searchTerm,
      resourceName: 'comics'
    };
    const resourceData = await searchResourceList(options);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("/series/page/:page", async(req, res) => {
  const page = parseInt(req.params.page);
  try {
    if (isNaN(page))
    throw new Error("Page Not Found!");
    const options = { page: page }
    const resourceData = await getResourceList('series', options);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("/series/search", async(req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const options = {
      searchAttr: 'titleStartsWith',
      searchTerm,
      resourceName: 'series'
    };
    const resourceData = await searchResourceList(options);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("/characters/:id", async(req, res) => {
  const id = parseInt(req.params.id)
  try {
    if (isNaN(id))
      throw new Error("Page Not Found!");
    const resourceData = await getResource(`characters/${id}`);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});



router.get("/comics/:id", async(req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id)
  try {
    if (isNaN(id))
      throw new Error("Page Not Found!");
    const resourceData = await getResource(`comics/${id}`);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});


router.get("/series/:id", async(req, res) => {
  const id = parseInt(req.params.id)
  try {
    if (isNaN(id))
      throw new Error("Page Not Found!");
    const resourceData = await getResource(`series/${id}`);
    res.json({data: resourceData});
  } catch(e){
    res.status(404).json({error: e.message});
  }
});

router.get("*", async(req, res) => {
  res.status(404).json({error: "Page not found!"});
});

module.exports = router;
