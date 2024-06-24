import { toast } from "react-hot-toast";
import axios from "../../../utils/axios";

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://ec2-15-206-69-49.ap-south-1.compute.amazonaws.com/auth/login", user);
      const responseData  = response.data;
      const { token } = responseData;
      axios.defaults.headers.common["Authorization"] = `${token}`;
      // store token in local storage
      localStorage.setItem("token", token);
      dispatch({
        type: "LOGIN_USER",
        payload: responseData,
      });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
};

export const signupUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://ec2-15-206-69-49.ap-south-1.compute.amazonaws.com/auth/signup", user);
      const responseData = response.data;
      const { token } = responseData;
      axios.defaults.headers.common["Authorization"] = `${token}`;
      // store token in local storage
      localStorage.setItem("token", token);
      dispatch({
        type: "SIGNUP_USER",
        payload: responseData,
      });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
};

export const loadUser = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await axios.get(`http://ec2-15-206-69-49.ap-south-1.compute.amazonaws.com/auth/validate-token/${token}`);
      const responseData  = response.data;
      dispatch({
        type: "LOAD_USER",
        payload: {
          token,
          user: responseData,
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  return {
    type: "LOGOUT",
  };
}