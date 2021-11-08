import { actionType } from "../actions/type";

const inititalState = {
  visible: false,
  title: "",
  CompContentDrawer: <p>Default</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo!");
  },
};

const reducer = (state = inititalState, { type, payload }) => {
  switch (type) {
    case actionType.HIDE_DRAWER:
      return { ...state, visible: false };
    case actionType.OPEN_FORM_IN_DRAWER_POPUP:
      return {
        ...state,
        visible: true,
        CompContentDrawer: payload.component,
        title: payload.title,
      };
    case actionType.SET_SUBMIT_FUNCTION:
      return { ...state, callBackSubmit: payload };
    default:
      return state;
  }
};

export default reducer;
