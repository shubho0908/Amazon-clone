const AddToCart = (data) => {
    return {
      type: "ADD_TO_CART",
      data: data,
    };

  };
  const RemoveCart = (id) => {
    return {
      type: "REMOVE_FROM_CART",
      id: id,
    };
  };


  const IncreaseQuantity = (id) => {
    return {
      type: "INCREASE_QUANTITY",
      id: id,
    };
  };

  const DecreaseQuantity = (id) => {
    return {
      type: "DECREASE_QUANTITY",
      id: id,
    };
  };
  

  
  export { AddToCart, RemoveCart,IncreaseQuantity,DecreaseQuantity };
  