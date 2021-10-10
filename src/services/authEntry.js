import axios from "axios";
import * as yup from "yup";

//schema
export const schema = yup.object().shape({
    email: yup.string().required("Email is required!").email("Email is invalid!"),
    password: yup
      .string()
      .required("Password is required!")
      .min(6, "Password must have 6-8 characters")
      .max(8, "Password must have 6-8 characters"),
  });
  
//login axios
class AuthService {
    logIn(data){
        return axios({
            url: "http://jiranew.cybersoft.edu.vn/api/Users/signin",
            method: "POST",
            data,
            // headers:{
            //   
            // }
          });
    }
}
export default AuthService