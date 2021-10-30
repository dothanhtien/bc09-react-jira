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

      if (err.response.data.statusCode === 403) {
        dispatch(
          createAction(actionType.SET_TASK_ERROR, err.response.data.content)
        );
      }
    }
  };
};

export const fetchAllTaskTypes = async (dispatch) => {
  try {
    const res = await taskService.fetchAllTaskTypes();

    dispatch(createAction(actionType.SET_TASK_TYPES, res.data.content));
  } catch (err) {
    console.log(err);
  }
};

export const fetchTaskDetail = (taskId) => {
  return async (dispatch) => {
    try {
      const res = await taskService.fetchTaskDetail(taskId);

      dispatch(createAction(actionType.SET_TASK_DETAIL, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTask = (data) => {
  return async (dispatch) => {
    try {
      await taskService.updateTask(data);
    } catch (err) {
      console.log(err);
    }
  };
};
