import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      id="app-download"
      className="flex flex-col items-center justify-center text-center my-16 gap-6"
    >
      <p className="text-2xl font-semibold text-gray-800 leading-snug">
        For Better Experience Download <br /> Foodzilla App
      </p>

      <div className="flex items-center gap-6 mt-4">
        <img
          src={assets.play_store}
          alt="play_store"
          className="w-[140px] cursor-pointer hover:scale-105 transition-transform"
        />
        <img
          src={assets.app_store}
          alt="app_store"
          className="w-[140px] cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
};

export default AppDownload;
