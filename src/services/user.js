import axiosClient from "./axiosClient";

class UserService {
  fetchAllUsers(params) {
    return axiosClient.get("/api/Users/getUser", { params });
  }

  deleterUser(id) {
    return axiosClient.delete(`api/Users/deleteUser?id=${id}`);
  }

  getMembersByProjectId(projectId) {
    return axiosClient.get(`/api/Users/getUserByProjectId?idProject=${projectId}`);
  }
}

export default UserService;
