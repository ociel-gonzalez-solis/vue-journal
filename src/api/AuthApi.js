import axios from "axios";


const AuthApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyBPL9cq9n2wPiWXEiP1DYT9H9DHFkZLZZg",
  },
});

export default AuthApi;