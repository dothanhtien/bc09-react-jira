import axiosClient from "./axiosClient";

class CommentService {
  fetchAllComments(params) {
    return axiosClient.get("/api/Comment/getAll", { params });
  }

  insertComment(data) {
    return axiosClient.post("/api/Comment/insertComment", data);
  }

  updateComment(params) {
    return axiosClient.put("/api/Comment/updateComment", {}, { params });
  }

  deleteComment(params) {
    return axiosClient.delete("/api/Comment/deleteComment", { params });
  }
}

export default CommentService;
