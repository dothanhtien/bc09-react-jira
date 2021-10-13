
import AuthService, { FetchMeService, RegisterService } from "./authServices";

export const authService = new AuthService();
export const fetchMeService = new FetchMeService();
export const registerService = new RegisterService();