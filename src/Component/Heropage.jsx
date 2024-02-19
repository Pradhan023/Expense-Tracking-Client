import React from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Heropage = () => {
  const Nav = useNavigate();
  const handleChange = () => {
    Nav("/login");
  };
  return (
    <>
      <div className="herobg">
        <div className="flex flex-col justify-center h-96 gap-12">
          {/* content */}
          <div className="flex justify-center">
            <h1 className="text-white text-3xl">Track Your Daily Expense</h1>
          </div>

          {/* get started */}
          <div className="pl-3 lg:pl-28 cursor-pointer" onClick={handleChange}>
            <p className="flex items-center gap-3 bg-amber-400 font-bold text-xl w-fit lg:px-4 px-2 py-3 rounded-lg">
              Get Started <FaArrowRightToBracket />{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heropage;
