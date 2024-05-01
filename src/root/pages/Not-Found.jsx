import React from "react";
import { BiSolidHomeCircle } from "react-icons/bi";
import { FaArrowRightLong } from "react-icons/fa6";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-white">
      <div className="flex flex-col px-2 gap-2 items-center">
        <img src="/assets/not-found.avif" className="w-[300px]" alt="" />

        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl text-center font-bold">
            Page not found
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-center font-light">
            Uh-oh! Looks like the page you are trying to access, doesn't exist. <br />
            Please start a fresh 😅
          </p>
          <Link
            href="/"
            className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-light text-white rounded-md shadow-2xl group border border-gray-100 hover:bg-blue-600 mt-4"
          >
            <span className="relative text-xl ">Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
