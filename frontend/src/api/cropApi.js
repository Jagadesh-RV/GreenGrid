import axios from "axios";
export const getCrops = () =>
  axios.get("http://localhost:5000/api/crop");