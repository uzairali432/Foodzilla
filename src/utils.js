 export const handleLogout = (navigate) => {
  localStorage.removeItem("user"); 
  navigate("/Main");    
};

