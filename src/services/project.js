import axiosClient from "./axiosClient";

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("api/Project/getAllProject", { params });
  }
}

export default ProjectService;
