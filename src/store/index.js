import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import authReducer from "./reducers/authReducer";
import user from "./reducers/user";
import project from "./reducers/project";
import task from "./reducers/task";

const reducer = combineReducers({ authReducer, user, project, task });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
