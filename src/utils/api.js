import axios from "axios";

export const BASE_URL = "https://hello-books-postgresql.herokuapp.com/api/v2";

export default axios.create(
    {
        baseURL: BASE_URL,
        headers: {
            accept: "application/json",
            "content-type": "application/json",
        }
    }
);