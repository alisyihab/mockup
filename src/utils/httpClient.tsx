// httpClient.js
import axios from "axios";

const httpClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/public`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
