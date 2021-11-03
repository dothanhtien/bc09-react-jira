import { createAction } from ".";
import { priorityService } from "../../services";
import { actionType } from "./type";


export const getPriority = async (dispatch) => {
  try {
    const res = await priorityService.getPriority();
    console.log(res.data.content);

    dispatch(createAction(actionType.GET_PRIORITY, res.data.content));
  } catch (err) {
    console.log({ ...err });
  }
};
