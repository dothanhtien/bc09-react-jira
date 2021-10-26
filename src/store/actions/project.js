import { projectService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllProjects = (params) => {
  return async (dispatch) => {
    try {
      const res = await projectService.fetchAllProjects(params);

      dispatch(createAction(actionType.SET_PROJECT_LIST, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProjectDetail = (projectId) => {
  return async (dispatch) => {
    try {
      const res = await projectService.fetchProjectDetail(projectId);

      dispatch(createAction(actionType.SET_PROJECT_DETAIL, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
