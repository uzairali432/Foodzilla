import header_img from "../../assets/header_img.png";

const Header = () => {
  return (
    <header
      style={{ backgroundImage: `url(${header_img})` }}
      className="relative w-[90%] h-[34vw] mb-[50px] mt-[130px] mx-auto rounded-[24px] bg-no-repeat bg-cover
  max-[1050px]:h-[40vw] max-[750px]:rounded-[16px]"
    >
      <div
        className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-fadeIn
        max-[1050px]:max-w-[45%] max-[750px]:max-w-[65%] max-[600px]:max-w-[85%]"
      >
        <h2
          className="font-medium text-white text-[max(3.9vw,22px)] 
          drop-shadow-[4px_4px_4px_rgba(0,0,0,0.2)]"
        >
          Order Your Favourite Food Here
        </h2>

        <p
          className="text-justify text-white text-[1vw] 
          drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)] 
          max-[750px]:hidden"
        >
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>

        <a href="#explore-menu">
          <button
            className="bg-[#0E2A45] text-white font-medium border-none rounded-lg 
            px-[2.3vw] py-[1vw] text-[max(1vw,13px)] cursor-pointer
            max-[750px]:px-[4vw] max-[750px]:py-[2vw] max-[600px]:px-[3.5vw] max-[600px]:py-[2vw]"
          >
            View Menu
          </button>
        </a>
      </div>
    </header>
  );
};

export default Header;