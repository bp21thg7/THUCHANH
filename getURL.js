import url from "url";
const getPath = (req) => {
  return req.url;
};
const getPagramsURL = (req) => {
  let urlData = url.parse(req.url, true);
  return JSON.stringify(urlData.query);
};
export { getPagramsURL, getPath };
