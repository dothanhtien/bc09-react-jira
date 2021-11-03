import { createAction } from ".";
import { statusService } from "../../services";
import { actionType } from "./type";


export const getStatus = async (dispatch)=>{
try{
    const res = await statusService.getStatus()
    console.log(res.data.content);

    dispatch(createAction(actionType.GET_STATUS, res.data.content))
   
}catch(err){
    console.log({...err});
}
}