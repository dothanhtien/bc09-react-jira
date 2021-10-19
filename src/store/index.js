import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducers
import auth from "./reducers/auth";
import project from "./reducers/project";
import user from "./reducers/user";

const reducer = combineReducers({ auth, project, user });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
