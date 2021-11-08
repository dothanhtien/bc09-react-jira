import { actionType } from "../actions/type";

const intitialValue = {
  statusTypes: [],
};

const reducer = (state = intitialValue, { type, payload }) => {
  switch (type) {
    case actionType.GET_STATUS:
      state.statusTypes = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
