import axiosClient from "./axiosClient";

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
}

export default TaskService;
