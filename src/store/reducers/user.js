import { actionType } from "../actions/type";

const initialState = {
  userList: [],
  projectMembers: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_USER_LIST: {
      state.userList = payload;
      return { ...state };
    }
    case actionType.GET_PROJECT_MEMBERS:
      state.projectMembers = payload;
      console.log(payload);
      
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
