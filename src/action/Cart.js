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
  
  export { AddToCart, RemoveCart };
  