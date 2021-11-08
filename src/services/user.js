import axiosClient from "./axiosClient";

class UserService {
  fetchAllUsers(params) {
    return axiosClient.get("/api/Users/getUser", { params });
  }

  deleterUser(id){
    return axiosClient.delete(`api/Users/deleteUser?id=${id}`)
  }
}

export default UserService;
