const AddToList = (data) => {
    return {
      type: "ADD",
      data: data,
    };

  };
  const RemoveList = (id) => {
    return {
      type: "REMOVE",
      id: id,
    };
  };
  
  export { AddToList, RemoveList };
  