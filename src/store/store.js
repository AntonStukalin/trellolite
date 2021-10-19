import { createStore, applyMiddleware } from "redux";
import {createLogger} from "redux-logger";
import rootReducer from "../reducers/rootReducer";


const logger = createLogger({
    diff: true,
})

export const store = createStore(rootReducer, applyMiddleware(logger));