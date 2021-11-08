import axiosClient from "./axiosClient";
import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  projectName: yup.string().required("Project name is required"),
  categoryId: yup
    .number()
    .required("Project category is required")
    .min(1, "Project category is required")
    .max(3, "Project category is required"),
});

class ProjectService {
  fetchAllProjects(params) {
    return axiosClient.get("api/Project/getAllProject", { params });
  }

  fetchAllProjectCategories() {
    return axiosClient.get("/api/ProjectCategory");
  }

  createProjectAuthorize(data) {
    return axiosClient.post("/api/Project/createProjectAuthorize", data);
  }

  updateProject(data) {
    return axiosClient.put(
      `/api/Project/updateProject?projectId=${data.id}`,
      data
    );
  }

  fetchUsersByProject(projectId) {
    return axiosClient.get("/api/Users/getUserByProjectId", {
      params: { idProject: projectId },
    });
  }

  assignUserToProject(data) {
    return axiosClient.post("/api/Project/assignUserProject", data);
  }

  removeUserFromProject(data) {
    return axiosClient.post("/api/Project/removeUserFromProject", data);
  }

  deleteProject(projectId) {
    return axiosClient.delete("/api/Project/deleteProject", {
      params: {
        projectId,
      },
    });
  }

  fetchProjectDetail(projectId) {
    return axiosClient.get("/api/Project/getProjectDetail", {
      params: { id: projectId },
    });
  }
}

export default ProjectService;
