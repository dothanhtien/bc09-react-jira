import { taskService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

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

export const createTask = (data, callback) => {
  return async (dispatch) => {
    try {
      dispatch(createAction(actionType.SET_TASK_ERROR, null));

      await taskService.createTask(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
      if (
        err.response.data.statusCode === 500 &&
        err.response.data.content === "task already exists!"
      ) {
        dispatch(
          createAction(actionType.SET_TASK_ERROR, "Task already exists!")
        );
      }
    }
  };
};
