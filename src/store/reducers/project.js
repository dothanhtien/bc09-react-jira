import { actionType } from "../actions/type";

const initialState = {
  projectList: [],
  projectDetail: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_PROJECT_LIST: {
      state.projectList = payload;
      return { ...state };
    }
    case actionType.SET_PROJECT_DETAIL: {
      state.projectDetail = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
