import { actionType } from "../actions/type";

const initialState = {
  projectList: [],
  projectCategories: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_PROJECT_LIST: {
      state.projectList = payload;
      return { ...state };
    }
    case actionType.SET_PROJECT_CATEGORIES: {
      state.projectCategories = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
