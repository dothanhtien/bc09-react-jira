import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import me from "./reducers/me";
import user from "./reducers/user";
import project from "./reducers/project";
import task from "./reducers/task";
import drawerModal from "./reducers/drawerModal";
import priority from "./reducers/priority";
import status from "./reducers/status";

const reducer = combineReducers({
  me,
  user,
  project,
  task,
  drawerModal,
  priority,
  status,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
