import { actionType } from "../actions/type"

const intitialValue = {
    statusTypes: []
}

export default (state=intitialValue, {type, payload})=>{
    switch (type){
        case (actionType.GET_STATUS):
            state = {...state, statusTypes: payload}
        
        default:
            return state
    }
}