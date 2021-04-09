import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import reducer from "./component/reducer/reducer";
import thunk from "redux-thunk";

const root = combineReducers({ reducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(root, composeEnhancers(applyMiddleware(thunk)));

export default store;
