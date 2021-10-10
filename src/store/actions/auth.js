
import swal from "sweetalert";
import { createAction } from ".";
import { authService } from "../../services";
import { actionType } from "./type";

export const logIn = (values, callBack) => {
  return async (dispatch) => {
    try {
      // const res = await axios({
      //   url: "http://casestudy.cyberlearn.vn/api/Users/signin",
      //   method: "POST",
      //   data: values,
      // });
      const res = await authService.logIn(values);
      console.log(res.data);
      swal("for team jira 6!", "API successfully called!", "success");
      // swal("Welcome!", "Enjoy the day!", "success");

      dispatch(createAction(actionType.SET_LOGIN, res.data));

      localStorage.setItem("loginToken", res.data.content.accessToken);
      localStorage.setItem("loginInfo", JSON.stringify(res.data.content));

      callBack();
    } catch (err) {
      console.log({ ...err });
      console.log(err.response.data.message);
      swal("Awww!", err.response.data.message, "error");
    }
  };
};
