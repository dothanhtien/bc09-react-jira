import AuthService from "./auth";
import UserService from "./user";
import ProjectService from "./project";
import TaskService from "./task";

export const authService = new AuthService();
export const userService = new UserService();
export const projectService = new ProjectService();
export const taskService = new TaskService();
