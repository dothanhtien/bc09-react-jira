import { userService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

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
