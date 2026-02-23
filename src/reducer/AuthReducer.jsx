
const AuthReducer = (state, action) => {
  switch (action.type) {
      case "REGISTER_USER":
      console.log("working", action);
      return {
        ...state, 
        name: action.payload.name,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber, 
       };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default AuthReducer;
