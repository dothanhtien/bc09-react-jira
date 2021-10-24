import { taskService } from "../../services";

export const updateTaskStatus = ({ taskId, statusId }, callback) => {
  return async (dispatch) => {
    try {
      await taskService.updateTaskStatus(taskId, statusId);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};
