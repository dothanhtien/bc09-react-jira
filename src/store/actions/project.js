import { projectService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllProjects = async (dispatch) => {
  try {
    const res = await projectService.fetchAllProjects();
    console.log(res);

    dispatch(createAction(actionType.SET_PROJECT_LIST, res.data.content));
  } catch (err) {
    console.log(err);
  }
};
