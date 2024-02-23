import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  httpsAgent: null,
  proxy: false,
  timeout: 60000,
});
