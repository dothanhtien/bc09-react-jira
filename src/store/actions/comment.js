import { commentService } from "../../services";

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
      commentService.insertComment(data);

      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateComment = (params, callback) => {
  return async () => {
    try {
      await commentService.updateComment(params);

      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteComment = (params, callback) => {
  return async () => {
    try {
      await commentService.deleteComment(params);

      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  };
};
