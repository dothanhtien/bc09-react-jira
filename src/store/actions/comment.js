import { commentService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";

export const fetchAllComments = (params, callback) => {
  return async () => {
    try {
      await commentService.fetchAllComments(params);

      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const insertComment = (data, callback) => {
  return async () => {
    try {
      await commentService.insertComment(data);

      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateComment = (params, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SET_COMMENT_ERROR, null));
    try {
      await commentService.updateComment(params);

      if (callback) callback();
    } catch (err) {
      console.log(err);
      if (err.response.data.statusCode === 403) {
        dispatch(
          createAction(actionType.SET_COMMENT_ERROR, err.response.data.content)
        );
      }
    }
  };
};

export const deleteComment = (params, callback) => {
  return async (dispatch) => {
    dispatch(createAction(actionType.SET_COMMENT_ERROR, null));
    try {
      await commentService.deleteComment(params);

      if (callback) callback();
    } catch (err) {
      console.log(err);
      if (err.response.data.statusCode === 403) {
        dispatch(
          createAction(actionType.SET_COMMENT_ERROR, err.response.data.content)
        );
      }
    }
  };
};
