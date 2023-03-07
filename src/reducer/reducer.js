import ItemsAdded from "./ListReducer";
import CartItemsAdded from "./CartReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ItemsAdded,
  CartItemsAdded,
});

export default rootReducer;
