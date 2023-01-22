import axios from "axios";
import Mustache from "mustache";
import apiRoutes from "../configs/apiRoutes.json";

const unsplashKey = process.env.REACT_APP_UNSPLASH_KEY;
const unsplashEnpoints = apiRoutes.unsplash;

/**
 * Request function to fetch images from unsplash
 * @param {*} pageNo - Pageno for fetching new page records
 * @returns {Promise} - API response from unsplash
 */
export const getPhotos = (pageNo) => {
  const apiUrl = Mustache.render(unsplashEnpoints.getPhotos, { pageNo, unsplashKey })
  return axios.get(apiUrl);
}