import axios from "axios";
import store from "../../redux/stores";

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // timeout: 5000,
  headers: {},
});


instance.interceptors.request.use(
  (req) => {
    const auth = localStorage.getItem("token");
    if (auth) {
      req.headers.authorization = `${auth}`;
    }
    return req;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      store.dispatch({
        type: "LOGOUT",
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
