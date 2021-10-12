import axiosClient from "./axiosClient";

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("api/Project/getAllProject", { params });
  }

  fetchAllProjectCategories() {
    return axiosClient.get("/api/ProjectCategory");
  }
}

export default ProjectService;
