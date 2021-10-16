import { actionType } from "../actions/type";

const initialState = null;

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SET_LOGIN:
      state = payload;
      return { ...state };
    default:
        return state
  }
};
export default reducer