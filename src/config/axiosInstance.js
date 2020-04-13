import axios from "axios";

const $axios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 500000
});

export default $axios;
