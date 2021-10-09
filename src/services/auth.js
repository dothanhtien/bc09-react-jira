import axiosClient from "./axiosClient";

class AuthService {
  signin(data) {
    return axiosClient.post("/api/Users/signin", data);
  }

  signup(data) {}
}

export default AuthService;
