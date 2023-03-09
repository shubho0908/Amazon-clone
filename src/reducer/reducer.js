import ItemsAdded from "./ListReducer";
import CartItemsAdded from "./CartReducer";
import OrderAdded from "./OrderReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  ItemsAdded,
  CartItemsAdded,
  OrderAdded,
});

export default rootReducer;
