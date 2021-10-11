import axios from "axios";
import * as yup from "yup";
import { ACCESS_TOKEN, TOKEN_CYBERSOFT } from "../utils/constants/config";

//schema
export const schema = yup.object().shape({
  email: yup.string().required("Email is required!").email("Email is invalid!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must have 6-8 characters!")
    .max(8, "Password must have 6-8 characters!"),
});

//login axios
class AuthService {
  logIn(data) {
    return axios({
      url: "http://jiranew.cybersoft.edu.vn/api/Users/signin",
      method: "POST",
      data,
      TokenCybersoft: TOKEN_CYBERSOFT,
    });
  }
}
export default AuthService;

//login maintainance axios
class FetchMeService {
  fetchMe() {
    return axios({
      url: "http://jiranew.cybersoft.edu.vn/api/Users/getUser",
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  }
}
export { FetchMeService };
