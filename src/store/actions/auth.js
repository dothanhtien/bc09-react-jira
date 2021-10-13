import swal from "sweetalert";
import { createAction } from ".";
import { authService, fetchMeService } from "../../services";
import { ACCESS_TOKEN } from "../../utils/constants/config";
import { actionType } from "./type";

//Log in function
export const logIn = (values, callBack) => {
  return async (dispatch) => {
    try {
      // axios configured @authServices
      const res = await authService.logIn(values);
      console.log(res.data);
      swal("To team Jira 6!", "API successfully called!", "success");

      dispatch(createAction(actionType.SET_LOGIN, res.data));

      //ACCESSTOKEN declared @utils
      localStorage.setItem(ACCESS_TOKEN, res.data.content.accessToken);
      localStorage.setItem("loginInfo", JSON.stringify(res.data.content));

      callBack();
    } catch (err) {
      console.log({ ...err });
      console.log(err.response.data.message);
      swal("Awww!", err.response.data.message, "error");
    }
  };
};

//login maintaince: not working!
export const fetchMe = async (dispatch) => {
  try {
    const res = await fetchMeService.fetchMe();
    console.log(res.data);
    alert("fetchme works");

    dispatch(createAction(actionType.SET_LOGIN, res.data));

  } catch (err) {
    console.log("err", { ...err });
    alert("duy trì đăng nhập ko thành, xem lại authservices, link api, useEffect @app.js");
  }
};
