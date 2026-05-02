import axios from "axios";
export const getProducts = () =>
  axios.get("http://localhost:5000/api/market");