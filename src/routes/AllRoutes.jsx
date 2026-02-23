import { Route, Routes, useLocation } from 'react-router';
import Cart from '../pages/customer/Cart';
import PlaceOrder from '../pages/customer/PlaceOrder';
import CustomerSignUp from '../pages/Auth/CustomerSignUp';
import CustomerLogin from '../pages/Auth/CustomerLogin';
import PrivateRoute from './PrivateRoute';
import SellerSignUp from '../pages/Auth/SellerSignUp';
import SellerLogin from '../pages/Auth/SellerLogin';
import VendorSignUp from '../pages/Auth/VendorSignUp';
import VendorLogin from '../pages/Auth/VendorLogin';
import SellerPage from '../pages/Seller/SellerPage';
import VendorPage from '../pages/Vendor/VendorPage';
import RiderSignUp from '../pages/Auth/RiderSignUp';
import RiderLogin from '../pages/Auth/RiderLogin';
import RiderPage from '../pages/rider/RiderPage';
import Main from '../pages/MainPage';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import Home from '../pages/home/Home';

const AllRoutes = ({ setShowNavbar }) => {
  const location = useLocation();

  const hideNavbarRoutes = [
    "/SellerPage",
    "/VendorPage",
    "/RiderPage",
    "/Main",
    "/CustomerSignUp",
    "/CustomerLogin",
    "/SellerSignUp",
    "/SellerLogin",
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

        <Route path="/SellerSignUp" element={<SellerSignUp />} />
        <Route path="/SellerLogin" element={<SellerLogin />} />
        <Route path="/VendorSignUp" element={<VendorSignUp />} />
        <Route path="/VendorLogin" element={<VendorLogin />} />
        <Route
          path="/SellerPage"
          element={
            <PrivateRoute allowedRole="seller">
              <SellerPage />
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

        <Route path="/Main" element={<Main />} />
      </Routes>

      <Footer />
    </>
  );
};

export default AllRoutes;
