const OrderData = {
  OrderItems: JSON.parse(localStorage.getItem("OrderItems")) || [],
};

const OrderAdded = (state = OrderData, action) => {
  switch (action.type) {
    case "ADD":
      const productData = action.data;
      const updatedOrder = [...state.OrderItems, productData];
      localStorage.setItem("OrderItems", JSON.stringify(updatedOrder)); // Update local storage
      return {
        ...state,
        OrderItems: updatedOrder,
      };

    default:
      return state;
  }
};

export default OrderAdded;
