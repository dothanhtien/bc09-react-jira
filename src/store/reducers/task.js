import { actionType } from "../actions/type";

const initialState = {
  taskTypes: [],
  taskDetail: null,
  error: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_TASK_TYPES: {
      state.taskTypes = payload;
      return { ...state };
    }
    case actionType.SET_TASK_DETAIL: {
      state.taskDetail = payload;
      return { ...state };
    }
    case actionType.SET_TASK_ERROR: {
      state.error = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
