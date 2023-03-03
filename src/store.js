import rootReducer from './reducer/reducer'
// creating a store 
import { createStore } from "redux";

// adding the combined reducers into the store 
// PS: the 2nd argument is just for Redux Devtool Extension, it has nothing to do with the concept 
const store = createStore(rootReducer ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store