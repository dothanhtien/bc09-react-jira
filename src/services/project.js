import axiosClient from "./axiosClient";

class ProjectService {
  fetchAllProjects() {
    return axiosClient.get("api/Project/getAllProject");
  }
}

export default ProjectService;
