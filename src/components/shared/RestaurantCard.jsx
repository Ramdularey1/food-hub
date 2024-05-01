import { Link } from "react-router-dom";
import { IMG_URL } from "../../utils/constants";
import { useState } from "react";
import { handleScrollTop } from "../../utils/helper";

const RestaurantCard = ({ info }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      onClick={() => {
        handleScrollTop();
      }}
      className="hover:scale-95 transition-all duration-300"
      to={"/restaurant/" + info.id}
    >
      <div className=" w-[270px] md:w-80 p-2 min-h-[280px]">
        <div className="relative w-full">
          <div
            className={`w-full h-[191px] bg-gradient-to-tr from-gray-400 to-gray-800 rounded-xl ${
              imageLoaded ? "hidden" : ""
            }`}
          ></div>

          <img
            className={`w-full h-[191px] object-cover rounded-xl relative ${
              imageLoaded ? "" : "hidden"
            }`}
            src={IMG_URL + info?.cloudinaryImageId}
            alt=""
            onLoad={handleImageLoad}
            onError={() => console.error("Image loading error")}
          />

          {info?.aggregatedDiscountInfoV3 && (
            <div className="absolute top-[-4px] border border-gray-700  left-[-6px]  py-1 px-2 rounded-xl text-white  bg-gradient-to-r from-slate-700 to-gray-800">
              <span className="font-bold text-sm lg:text-lg">
                {info?.aggregatedDiscountInfoV3?.header}{" "}
                {info?.aggregatedDiscountInfoV3?.subHeader}
              </span>
            </div>
          )}
        </div>
        <div className="w-full px-4 mt-2">
          <h3 className="text-base lg:text-lg font-semibold text-gray-100 truncate">
            {info?.name}
          </h3>

          <p className="flex items-center gap-[2px] lg:gap-1 text-sm lg:text-base font-semibold text-gray-200">
            <span className="flex items-center gap-[2px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                role="img"
                aria-hidden="true"
                stopColor="rgba(2, 6, 12, 0.92)"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="9"
                  fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"
                ></circle>
                <path
                  d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z"
                  fill="white"
                ></path>
                <defs>
                  <linearGradient
                    id="StoreRating20_svg__paint0_linear_32982_71567"
                    x1="10"
                    y1="1"
                    x2="10"
                    y2="19"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#21973B"></stop>
                    <stop offset="1" stopColor="#128540"></stop>
                  </linearGradient>
                </defs>
              </svg>
              {info?.avgRating}
            </span>{" "}
            •<span>{info?.sla?.slaString}</span>
          </p>
          <p className="mt-1 truncate text-sm lg:text-base font-light text-gray-300">
            {info?.cuisines?.join(", ")}
          </p>
          <p className=" truncate font-light text-sm lg:text-base text-gray-300">
            {info?.areaName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;