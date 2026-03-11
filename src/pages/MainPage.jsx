import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-row w-11/12 max-w-5xl gap-12">
        <div className="flex flex-col justify-center items-center  p-8 w-1/2">
          <img src={logo} alt="App Icon" className="mb-4" />
          <p className="text-lg text-[#0E2A45] text-center leading-relaxed">
            Fast & Fresh <br />
            At Your Doorstep 🍴
          </p>
        </div>
        <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-lg p-8 w-1/2">
          <div className="flex flex-col gap-4 w-72">
            <Link to="/CustomerSignUp">
              <button className="bg-white text-[#0E2A45] border-2 border-[#0E2A45] w-[100%] font-semibold py-3 rounded-lg hover:bg-[#E64D21] hover:text-white hover:border-[#E64D21] hover:cursor-pointer transition duration-300">
                Signup/Login as a Customer
              </button>
            </Link>
            <Link to="/AdminLogin">
              <button className="bg-white text-[#0E2A45] border-2 border-[#0E2A45] w-[100%] font-semibold py-3 rounded-lg hover:bg-[#E64D21] hover:text-white hover:border-[#E64D21] hover:cursor-pointer transition duration-300">
                Login as an Admin
              </button>
            </Link>
            <Link to="/VendorSignUp">
              <button className="bg-white text-[#0E2A45] border-2 border-[#0E2A45] w-[100%] font-semibold py-3 rounded-lg hover:bg-[#E64D21] hover:text-white hover:border-[#E64D21] hover:cursor-pointer transition duration-300">
                Signup/Login as a Vendor
              </button>
            </Link>
            <Link to="/RiderSignUp">
              <button className="bg-white text-[#0E2A45] border-2 border-[#0E2A45] w-[100%] font-semibold py-3 rounded-lg hover:bg-[#E64D21] hover:text-white hover:border-[#E64D21] hover:cursor-pointer transition duration-300">
                Signup/Login as a Rider
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
