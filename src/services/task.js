import axiosClient from "./axiosClient";
import * as yup from "yup";

export const createTaskSchema = yup.object().shape({
  taskName: yup.string().required("Project name is required"),
  description: yup.string().required("Description is required"),
  
  
});

class TaskService {
  updateTaskStatus(taskId, statusId) {
    return axiosClient.put("/api/Project/updateStatus", { taskId, statusId });
  }

  createTask(data) {
    return axiosClient.post("/api/Project/createTask", data);
  }

  fetchAllTaskTypes() {
    return axiosClient.get("/api/TaskType/getAll");
  }

  fetchTaskDetail(taskId) {
    return axiosClient.get("/api/Project/getTaskDetail", {
      params: { taskId },
    });
  }

  updateTask(data) {
    return axiosClient.post("/api/Project/updateTask", data);
  }

  updateDescription(data) {
    return axiosClient.put("/api/Project/updateDescription", data);
  }

  updatePriority(data) {
    return axiosClient.put("/api/Project/updatePriority", data);
  }

  assignUserToTask(data) {
    return axiosClient.post("/api/Project/assignUserTask", data);
  }

  removeUserFromTask(data) {
    return axiosClient.post("/api/Project/removeUserFromTask", data);
  }

  updateEstimate(data) {
    return axiosClient.put("/api/Project/updateEstimate", data);
  }

  updateTimeTracking(data) {
    return axiosClient.put("/api/Project/updateTimeTracking", data);
  }

  removeTask(params) {
    return axiosClient.delete("/api/Project/removeTask", { params });
  }
}

export default TaskService;
