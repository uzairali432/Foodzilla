import { Route, Routes, useLocation } from 'react-router';
import Cart from '../pages/customer/Cart';
import PlaceOrder from '../pages/customer/PlaceOrder';
import CustomerSignUp from '../pages/Auth/CustomerSignUp';
import CustomerLogin from '../pages/Auth/CustomerLogin';
import PrivateRoute from './PrivateRoute';
import AdminLogin from '../pages/Auth/AdminLogin';
import VendorSignUp from '../pages/Auth/VendorSignUp';
import VendorLogin from '../pages/Auth/VendorLogin';
import AdminPage from '../pages/Seller/AdminPage';
import VendorPage from '../pages/Vendor/VendorPage';
import RiderSignUp from '../pages/Auth/RiderSignUp';
import RiderLogin from '../pages/Auth/RiderLogin';
import RiderPage from '../pages/rider/RiderPage';
import Main from '../pages/MainPage';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Home from '../pages/home/Home';
import RestaurantPage from '../pages/RestaurantPage';

const AllRoutes = ({ setShowNavbar }) => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/SellerPage",
    "/VendorPage",
    "/RiderPage",
    "/Main",
    "/CustomerSignUp",
    "/CustomerLogin",
    "/AdminLogin",
    "/AdminPage",
    "/VendorSignUp",
    "/VendorLogin",
    "/RiderSignUp",
    "/RiderLogin"
  ];

  const shouldHide = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar setShowNavbar={setShowNavbar} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder />} />

        <Route path="/CustomerSignUp" element={<CustomerSignUp />} />
        <Route path="/CustomerLogin" element={<CustomerLogin />} />
        <Route
          path="/"
          element={
            <PrivateRoute allowedRole="customer">
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/VendorSignUp" element={<VendorSignUp />} />
        <Route path="/VendorLogin" element={<VendorLogin />} />
        <Route
          path="/AdminPage"
          element={
            <PrivateRoute allowedRole="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/VendorPage"
          element={
            <PrivateRoute allowedRole="vendor">
              <VendorPage />
            </PrivateRoute>
          }
        />

        <Route path="/RiderSignUp" element={<RiderSignUp />} />
        <Route path="/RiderLogin" element={<RiderLogin />} />
        <Route
          path="/RiderPage"
          element={
            <PrivateRoute allowedRole="rider">
              <RiderPage />
            </PrivateRoute>
          }
        />

        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/Main" element={<Main />} />
      </Routes>

      <Footer />
    </>
  );
};

export default AllRoutes;
