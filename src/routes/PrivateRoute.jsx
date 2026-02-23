import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    let loginRoute = "/CustomerLogin";

    if (allowedRole === "seller") loginRoute = "/SellerLogin";
    if (allowedRole === "vendor") loginRoute = "/VendorLogin";
    if (allowedRole === "rider") loginRoute = "/RiderLogin";

    return <Navigate to={loginRoute} />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/main" />;
  }

  return children;
};

export default PrivateRoute;
