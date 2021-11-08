import AuthService from "./auth";
import UserService from "./user";
import ProjectService from "./project";
import TaskService from "./task";
import PriorityService from "./priority";
import StatusService from "./status";
import CommentService from "./comment";

export const authService = new AuthService();
export const userService = new UserService();
export const projectService = new ProjectService();
export const taskService = new TaskService();
export const priorityService = new PriorityService();
export const statusService = new StatusService();
export const commentService = new CommentService();
