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
}

export default TaskService;
