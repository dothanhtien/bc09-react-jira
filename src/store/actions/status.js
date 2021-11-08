import { statusService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const getStatus = async (dispatch) => {
  try {
    const res = await statusService.getStatus();

    dispatch(createAction(actionType.GET_STATUS, res.data.content));
  } catch (err) {
    console.log(err);
  }
};
