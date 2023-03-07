const CartData = {
  CartItems: JSON.parse(localStorage.getItem("CartItems")) || [],
};

const CartItemsAdded = (state = CartData, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const productData = action.data;
      const updatedCart = [...state.CartItems, productData];
      localStorage.setItem("CartItems", JSON.stringify(updatedCart));
      return {
        ...state,
        CartItems: updatedCart,
      };
    case "REMOVE_FROM_CART":
      const itemId = action.id;
      const newCart = state.CartItems.filter(
        (element) => element.id !== itemId
      );
      localStorage.setItem("CartItems", JSON.stringify(newCart));
      return {
        ...state,
        CartItems: newCart,
      };
    case "INCREASE_QUANTITY":
      const itemIndex = state.CartItems.findIndex(
        (item) => item.id === action.id
      );
      const newCartItems = [...state.CartItems];
      newCartItems[itemIndex].quantity++;
      localStorage.setItem("CartItems", JSON.stringify(newCartItems));
      return {
        ...state,
        CartItems: newCartItems,
      };
    case "DECREASE_QUANTITY":
      const itemIndex2 = state.CartItems.findIndex(
        (item) => item.id === action.id
      );
      const newCartItems2 = [...state.CartItems];
      newCartItems2[itemIndex2].quantity--;
      localStorage.setItem("CartItems", JSON.stringify(newCartItems2));
      return {
        ...state,
        CartItems: newCartItems2,
      };
    default:
      return state;
  }
};

export default CartItemsAdded;
