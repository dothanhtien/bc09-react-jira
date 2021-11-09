import axiosClient from "./axiosClient";
import * as yup from "yup";
import { schemaContent } from "./schemaContent";

export const schema = yup.object().shape({
  email: schemaContent.email,
  password: schemaContent.password,
});

export const schemaSignup = yup.object().shape(schemaContent);

class AuthService {
  logIn(data) {
    return axiosClient.post("/api/Users/signin", data);
  }

  signUp(data) {
    return axiosClient.post("/api/Users/signup", data);
  }

  fetchMe(params) {
    return axiosClient.get("/api/Users/getUser", { params });
  }
}

export default AuthService;
