import axiosClient from "./axiosClient";
import { ACCESS_TOKEN } from "../utils/constants/config";
import * as yup from "yup";
import { schemaContent } from "./schemaContent";

export const schema = yup.object().shape({
  email: schemaContent.email,
  password:schemaContent.password,
});

export const schemaSignup = yup.object().shape(schemaContent);

class AuthService {
  logIn(data) {
    return axiosClient.post("/api/Users/signin", data);
  }

  signUp(data) {
    return axiosClient.post("/api/Users/signup", data);
  }

  fetchMe() {
    return axiosClient.post(
      "/api/Users/getUser",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
        },
      }
    );
  }
}

export default AuthService;
