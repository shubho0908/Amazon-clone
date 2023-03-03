const ListData = {
    ListItems: [],
  };
  
  const ItemsAdded = (state = ListData, action) => {
    switch (action.type) {
      case "ADD":
        const productData = action.data;
        return {
          ...state,
          ListItems: [...state.ListItems, productData],
        };
      case "REMOVE":
        const newList = state.ListItems.filter(
          (element) => element.id !== action.id
        );
        return {
          ...state,
          ListItems: newList,
        };
      default:
        return state;
    }
  };
  
  export default ItemsAdded;
  