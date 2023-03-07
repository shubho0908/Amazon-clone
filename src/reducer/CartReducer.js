const CartData = {
  CartItems: JSON.parse(localStorage.getItem("CartItems")) || [],
};

const CartItemsAdded = (state = CartData, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const productData = action.data;
      const updatedCart = [...state.CartItems, productData];
      localStorage.setItem("CartItems", JSON.stringify(updatedCart)); // Update local storage
      return {
        ...state,
        CartItems: updatedCart,
      };
    case "REMOVE_FROM_CART":
      const itemId = action.id;
      const newCart = state.CartItems.filter((element) => element.id !== itemId);
      localStorage.setItem("CartItems", JSON.stringify(newCart)); // Update local storage
      return {
        ...state,
        CartItems: newCart,
      };
    default:
      return state;
  }
};

export default CartItemsAdded;
