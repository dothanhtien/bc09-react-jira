import { actionType } from "../actions/type";

const intitialValue = {
  priority: [],
};

const reducer = (state = intitialValue, { type, payload }) => {
  switch (type) {
    case actionType.GET_PRIORITY:
      state.priority = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
