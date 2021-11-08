import { projectService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";
import { notifitying } from "../../utils/notification";

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

export const fetchAllProjectCategories = async (dispatch) => {
  try {
    const res = await projectService.fetchAllProjectCategories();

    dispatch(createAction(actionType.SET_PROJECT_CATEGORIES, res.data.content));
  } catch (err) {
    console.log(err);
  }
};

export const createProjectAuthorize = (data, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SET_PROJECT_ERROR, null));
    try {
      const res = await projectService.createProjectAuthorize(data);
      dispatch(createAction(actionType.SET_PROJECT_DETAIL, res.data.content));

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
      dispatch(
        createAction(actionType.SET_PROJECT_ERROR, err.response.data.content)
      );
    }
  };
};

export const fetchUsersByProject = (projectId) => {
  return async (dispatch) => {
    try {
      const res = await projectService.fetchUsersByProject(projectId);

      dispatch(createAction(actionType.SET_PROJECT_MEMBERS, res.data.content));
    } catch (err) {
      console.log(err);
      if (
        err.response.data.statusCode === 404 &&
        err.response.data.content === "User not found in the project!"
      ) {
        dispatch(createAction(actionType.SET_PROJECT_MEMBERS, []));
      }
    }
  };
};

export const assignUserToProject = (data, callback) => {
  return async (dispatch) => {
    try {
      await projectService.assignUserToProject(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUserFromProject = (data, callback) => {
  return async (dispatch) => {
    try {
      await projectService.removeUserFromProject(data);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProject = (projectId, callback) => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(projectId);

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProjectDetail = (projectId, callback) => {
  return async (dispatch) => {
    try {
      const res = await projectService.fetchProjectDetail(projectId);

      dispatch(createAction(actionType.SET_PROJECT_DETAIL, res.data.content));

      if (callback) {
        callback();
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProject = (data, callBack)=>{
  return async(dispatch)=>{
    try{
      const res = await projectService.updateProject(data)
      console.log(res.data);

      callBack()
      notifitying('success', 'Project successfully updated')
    }catch(err){
      console.log({...err});
      notifitying('warning', 'User failed to be deleted')

    }
  }
}