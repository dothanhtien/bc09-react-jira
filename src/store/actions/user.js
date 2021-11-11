import { userService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";
import { notifitying } from "../../utils/notification";

export const fetchAllUsers = (params) => {
  return async (dispatch) => {
    try {
      const res = await userService.fetchAllUsers(params);

      dispatch(createAction(actionType.SET_USER_LIST, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await userService.deleterUser(id);

      dispatch(fetchAllUsers());

      notifitying("success", "User successfully deleted");
    } catch (err) {
      console.log(err);
      notifitying("warning", "User failed to be deleted");
    }
  };
};

export const getMembersByProjectId = (id) => {
  return async (dispatch) => {
    try {
      const res = await userService.getMembersByProjectId(id);

      dispatch(createAction(actionType.GET_PROJECT_MEMBERS, res.data.content));
    } catch (err) {
      dispatch(createAction(actionType.GET_PROJECT_MEMBERS, []));
      console.log(err);
    }
  };
};

export const updateUser = (data, callback) => {
  return async () => {
    try {
      userService.updateUser(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};
