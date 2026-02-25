import React, { useState } from "react";
import Header from "../customer/Header";
import ExploreMenu from "../customer/ExploreMenu";
import FoodDisplay from "../customer/FoodDisplay";
import AppDownload from "../customer/AppDownload";
import RestaurantList from "../../components/RestaurantList";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <RestaurantList />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
