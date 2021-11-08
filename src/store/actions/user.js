import { userService } from "../../services";
import { createAction } from ".";
import { actionType } from "./type";
import { notifitying } from "../../utils/notification";

export const fetchAllUsers = (params) => {
  return async (dispatch) => {
    try {
      const res = await userService.fetchAllUsers(params);

      dispatch(createAction(actionType.SET_USER_LIST, res.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteUser = (id)=>{
  return async (dispatch)=>{
    try{
      const res = await userService.deleterUser(id)
      console.log(res.data);

      dispatch(fetchAllUsers())

      notifitying('success', 'User successfully deleted')

    }catch(err){
      console.log({...err});
      notifitying('warning', 'User failed to be deleted')

    }
  }
}

export const getMembersByProjectId = (id)=>{
  return async(dispatch)=>{
    try{
      const res = await userService.getMembersByProjectId(id)
      console.log(res.data.content);

        dispatch(createAction(actionType.GET_PROJECT_MEMBERS, res.data.content))
     

    }catch(err){ 
      dispatch(createAction(actionType.GET_PROJECT_MEMBERS, []))
      console.log({...err});
    }
  }
}