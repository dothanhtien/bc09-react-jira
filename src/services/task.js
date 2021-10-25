import axiosClient from "./axiosClient";

class TaskService {
  updateTaskStatus(taskId, statusId) {
    return axiosClient.put("/api/Project/updateStatus", { taskId, statusId });
  }

  createTask(data) {
    return axiosClient.post("/api/Project/createTask", data);
  }
}

export default TaskService;
