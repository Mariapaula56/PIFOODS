import { createStore, applyMiddleware } from "redux";
import thunMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducer/reducer";

const composedEnhacer = composeWithDevTools(applyMiddleware(thunMiddleware));

const store = createStore(rootReducer, composedEnhacer);
export default store;
