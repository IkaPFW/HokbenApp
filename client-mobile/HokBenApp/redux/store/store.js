// import { applyMiddleware, combineReducers, createStore } from "redux";
// import thunk from "redux-thunk";
// import MenuReducer from "../reducers/MenuReducer";

// const rootReducer = combineReducers({
//     menu: MenuReducer
// })

// const logger = (store) => (next) => (action) => {
//     let result = next(action)
//     return result
// }

// export const store = createStore(
//     rootReducer,
//     applyMiddleware(logger, thunk)
// )