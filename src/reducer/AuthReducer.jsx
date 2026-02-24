
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      // clear local storage when logging out
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { user: null, token: null };

    default:
      return state;
  }
};

export default AuthReducer;
