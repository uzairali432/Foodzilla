import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "../../utils";

const Navbar = () => {
  const { cartItems } = useContext(StoreContext);
  const totalQuantity = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();

  return (
    <nav className="flex justify-around items-center fixed z-10 top-0 w-full py-3 border-b border-[#0E2A45] bg-white"
    >
      <Link to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="w-[100px] max-[1050px]:w-[140px] max-[900px]:w-[120px]"
        />
      </Link>

      <ul className="flex gap-6 text-gray-800 font-medium max-[750px]:hidden">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`transition cursor-pointer ${menu === "home"
            ? "text-primary border-b-2 border-primary pb-[2px]"
            : "hover:text-primary"
            }`}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`transition cursor-pointer ${menu === "menu"
            ? "text-primary border-b-2 border-primary pb-[2px]"
            : "hover:text-primary"
            }`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={`transition cursor-pointer ${menu === "mobile-app"
            ? "text-primary border-b-2 border-primary pb-[2px]"
            : "hover:text-primary"
            }`}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={`transition cursor-pointer ${menu === "contact-us"
            ? "text-primary border-b-2 border-primary pb-[2px]"
            : "hover:text-primary"
            }`}
        >
          Contact Us
        </a>
      </ul>

      <div className="flex items-center gap-8 max-[1050px]:gap-6 max-[900px]:gap-4">
        <div className="relative">
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              alt="basket_icon"
              className="w-6 max-[1050px]:w-[22px] max-[900px]:w-[20px] cursor-pointer"
            />
          </Link>
          {totalQuantity > 0 && (
            <div className="absolute -top-2 -right-2 flex items-center justify-center bg-[#E64D21] text-white text-xs font-semibold rounded-full w-5 h-5 shadow-md">
              {totalQuantity}
            </div>

          )}
        </div>

        <Link to={"/Main"}>
          <button className="bg-[#0E2A45] text-white border border-primary rounded-lg px-8 py-2 text-[16px] hover:bg-[#E64D21] max-[1050px]:px-6 max-[900px]:px-5 max-[900px]:text-[14px] cursor-pointer transition duration-300">
            Sign in
          </button>
        </Link>
        <button className="bg-[#0E2A45] text-white border border-primary rounded-lg px-2 py-1 text-[16px] hover:bg-[#E64D21] max-[1050px]:px-6 max-[900px]:px-5 max-[900px]:text-[14px] cursor-pointer transition duration-300"
          onClick={() => handleLogout(navigate)}>
          Log out
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
