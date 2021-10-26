import axiosClient from "./axiosClient";

class UserService {
  fetchAllUsers(params) {
    return axiosClient.get("/api/Users/getUser", { params });
  }
}

export default UserService;
