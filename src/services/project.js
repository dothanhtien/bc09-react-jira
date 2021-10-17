import axiosClient from "./axiosClient";

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("api/Project/getAllProject", { params });
  }

  deleteProject(projectId) {
    return axiosClient.delete("/api/Project/deleteProject", {
      params: {
        projectId,
      },
    });
  }
}

export default ProjectService;
