import { Link } from "react-router-dom";

const BtnSignUp = ({ isSubmitting, linkText, btnText, linkTo }) => {
  return (
    <div>
      <div className="pt-2 space-y-3 col-span-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-[#0E2A45] text-white py-3 rounded-lg hover:bg-[#E64D21] transition duration-300 font-medium"
        >
          {isSubmitting ? "Loading..." : <p>{btnText}</p>}
        </button>

        <Link to="/" className="block">
          <button
            type="button"
            className="w-full bg-gray-100 text-[#0E2A45] py-3 rounded-lg hover:bg-gray-200 transition duration-300 font-medium border border-gray-300"
          >
            Back to Home
          </button>
        </Link>
      </div>

      <Link to={linkTo} className="text-[#E64D21] hover:underline font-medium">
        <div className="mt-6 col-span-2 text-center">
          {linkText}
        </div>
      </Link>
    </div>
  );
};

export default BtnSignUp;
