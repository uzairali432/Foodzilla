import React from "react";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div
      className="max-w-[1200px] mx-auto px-6 flex flex-col gap-5 my-12"
      id="explore-menu"
    >
      <h1 className="text-gray-900 font-medium text-2xl md:text-3xl">
        Explore Our Menu
      </h1>

      <p className="max-w-[60%] text-gray-500 text-justify md:max-w-full md:text-sm">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>

      {/* Menu List */}
      <div className="flex justify-between items-center gap-[30px] text-center my-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              {/* Image */}
              <img
                src={item.menu_image}
                alt="menu_image"
                className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-200 cursor-pointer ${
                  category === item.menu_name
                    ? "border-4 border-primary p-[2px]"
                    : ""
                }`}
              />
              {/* Name */}
              <p className="mt-2 text-gray-500 text-[max(1.2vw,16px)]">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <hr className="my-2 h-[2px] bg-gray-200 border-none" />
    </div>
  );
};

export default ExploreMenu;
