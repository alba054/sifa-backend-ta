import axios from "axios";
import { API_URL } from "../utils/const/api";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
