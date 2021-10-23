import axiosClient from "./axiosClient";

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("api/Project/getAllProject", { params });
  }

  fetchProjectDetail(projectId) {
    return axiosClient.get("/api/Project/getProjectDetail", {
      params: { id: projectId },
    });
  }
}

export default ProjectService;
