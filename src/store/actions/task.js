import { taskService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";
import { notifitying } from "../../utils/notification";

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

      notifitying("success", "Task successfully created");
      dispatch(createAction(actionType.HIDE_DRAWER));
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

export const createTaskForm = (data) => {
  return async (dispatch) => {
    try {
      const res = await taskService.createTask(data);

      console.log(res.data);

      notifitying("success", "Task successfully created");
      dispatch(createAction(actionType.HIDE_DRAWER));

    } catch (err) {
      console.log({...err});
      notifitying("warning", "Task failed to be created");
      dispatch(createAction(actionType.HIDE_DRAWER));
    }
  };
};

export const fetchTaskDetail = (taskId, callback) => {
  return async (dispatch) => {
    try {
      const res = await taskService.fetchTaskDetail(taskId);

      dispatch(createAction(actionType.SET_TASK_DETAIL, res.data.content));

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTask = (data, callback) => {
  return async (dispatch) => {
    try {
      await taskService.updateTask(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateDescription = (data, callback) => {
  return async (dispatch) => {
    try {
      await taskService.updateDescription(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updatePriority = (data, callback) => {
  return async (dispatch) => {
    try {
      await taskService.updatePriority(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const assignUserToTask = (data, callback) => {
  return async (dispatch) => {
    try {
      taskService.assignUserToTask(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUserFromTask = (data, callback) => {
  return async (dispatch) => {
    try {
      taskService.removeUserFromTask(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateEstimate = (data, callback) => {
  return async (dispatch) => {
    try {
      taskService.updateEstimate(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateTimeTracking = (data, callback) => {
  return async (dispatch) => {
    try {
      taskService.updateTimeTracking(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeTask = (params, callback) => {
  return async () => {
    try {
      await taskService.removeTask(params);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};
