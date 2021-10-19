import { actionType } from "../actions/type";

const initialState = {
  projectList: [],
  projectCategories: [],
  projectMembers: [],
  projectDetail: null,
  error: null,
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
    case actionType.SET_PROJECT_MEMBERS: {
      state.projectMembers = payload;
      return { ...state };
    }
    case actionType.SET_PROJECT_DETAIL: {
      state.projectDetail = payload;
      return { ...state };
    }
    case actionType.SET_PROJECT_ERROR: {
      state.error = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
