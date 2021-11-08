import { actionType } from "../actions/type"


const intitialValue = {
    priority: []
}

export default (state=intitialValue, {type, payload})=>{
    switch (type){
        case (actionType.GET_PRIORITY):
            state = {...state, priority: payload}
        
        default:
            return state
    }
}