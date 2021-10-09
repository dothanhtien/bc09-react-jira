import { authService } from "../../services";

export const signin = (data) => {
  return async (dispatch) => {
    try {
      const res = await authService.signin(data);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
};
