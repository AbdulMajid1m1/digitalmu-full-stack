import axios from "axios";
import baseUrl from "./config";

const newRequest = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: baseUrl,
  withCredentials: true,
});

export default newRequest;
