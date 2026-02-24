 export const handleLogout = (navigate, dispatch) => {
  // clear stored user data and token
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  if (dispatch) {
    dispatch({ type: "LOGOUT" });
  }
  navigate("/Main");
};

