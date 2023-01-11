import axios from 'axios';
// import dotenv from 'dotenv'

// dotenv.config()
const customFetch = axios.create({

  baseURL: process.env.REACT_APP_BASE_URL
  // baseURL = process.env.BASEURL

});

export default customFetch;