import { priorityService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const getPriority = async (dispatch) => {
  try {
    const res = await priorityService.getPriority();

    dispatch(createAction(actionType.GET_PRIORITY, res.data.content));
  } catch (err) {
    console.log(err);
  }
};
