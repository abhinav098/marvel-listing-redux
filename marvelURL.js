const md5 = require('blueimp-md5');
require('dotenv').config({ path: 'variables.env' });

const MARVEL_API_KEY=process.env.MARVEL_API_KEY;
const MARVEL_PRIVATE_KEY=process.env.MARVEL_PRIVATE_KEY;
const PER_PAGE=process.env.PER_PAGE;

function getUrl(options) {
  const publickey = MARVEL_API_KEY;
  const privatekey = MARVEL_PRIVATE_KEY;
  const ts = new Date().getTime();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  const limit = PER_PAGE;
  const offset = ((options.page - 1) * limit) || 0;
  const searchAttr = options.searchAttr;
  const searchTerm = options.searchTerm;

  const baseUrl = `https://gateway.marvel.com:443/v1/public/${options.resourceName}`;
  let url;
  if(searchAttr && searchTerm) {
    url = `${baseUrl}?${searchAttr}=${searchTerm}&limit=${limit}&ts=${ts}&apikey=${publickey}&hash=${hash}`
  } else {
    url = `${baseUrl}?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${publickey}&hash=${hash}`
  }
  return url;
}

module.exports = { getUrl }
