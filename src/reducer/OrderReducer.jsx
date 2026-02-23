const OrderReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      const { name, value } = action.payload;
      return { ...state, [name]: value };

    case "ADD_DELIVERY":
  console.log("Adding delivery:", action.payload);
  return {
    ...state,
    deliveries: [action.payload, ...state.deliveries],
  };

    case "RESET_ORDER":
      return {
        ...state,
        FirstName: "",
        LastName: "",
        Email: "",
        Street: "",
        City: "",
        State: "",
        Zip: "",
        Country: "",
        Phone: "",
      };

    default:
      return state;
  }
};

export default OrderReducer;
