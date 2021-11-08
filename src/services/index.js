import AuthService from "./auth";
import UserService from "./user";
import ProjectService from "./project";
import TaskService from "./task";
import CommentService from "./comment";

export const authService = new AuthService();
export const userService = new UserService();
export const projectService = new ProjectService();
export const taskService = new TaskService();
export const commentService = new CommentService();
