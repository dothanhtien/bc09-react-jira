import axiosClient from "./axiosClient";

class TaskService {
  updateTaskStatus(taskId, statusId) {
    return axiosClient.put("/api/Project/updateStatus", { taskId, statusId });
  }
}

export default TaskService;
