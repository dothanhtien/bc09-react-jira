import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import authReducer from "./reducers/authReducer";
import project from "./reducers/project";
import user from "./reducers/user";

const reducer = combineReducers({ authReducer, project, user });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
