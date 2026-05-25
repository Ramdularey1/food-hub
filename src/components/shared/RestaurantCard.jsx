import { Link } from "react-router-dom";
import { IMG_URL } from "../../utils/constants";
import { useState } from "react";
import { handleScrollTop } from "../../utils/helper";

const RestaurantCard = ({ info }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  if (!info?.id) {
    return null;
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const storeRestaurantInfo = () => {
    try {
      sessionStorage.setItem("selectedRestaurant", JSON.stringify(info));
      sessionStorage.setItem(`restaurant-${info.id}`, JSON.stringify(info));
    } catch (error) {
      console.error("Unable to save restaurant info", error);
    }
  };

  return (
    <Link
      onClick={() => {
        storeRestaurantInfo();
        handleScrollTop();
      }}
      className="group block transition duration-300 hover:-translate-y-1"
      to={"/restaurant/" + info.id}
    >
      <div className="min-h-[310px] w-[270px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-2 shadow-lg shadow-black/10 transition group-hover:border-orange-400/50 group-hover:bg-white/[0.07] md:w-80">
        <div className="relative w-full">
          <div
            className={`h-[191px] w-full rounded-lg bg-slate-800 ${
              imageLoaded ? "hidden" : ""
            }`}
          ></div>

          <img
            className={`relative h-[191px] w-full rounded-lg object-cover ${
              imageLoaded ? "" : "hidden"
            }`}
            src={IMG_URL + info?.cloudinaryImageId}
            alt=""
            onLoad={handleImageLoad}
            onError={() => console.error("Image loading error")}
          />

          {info?.aggregatedDiscountInfoV3 && (
            <div className="absolute left-3 top-3 rounded-lg border border-white/10 bg-black/70 px-3 py-1 text-white shadow-lg backdrop-blur">
              <span className="text-sm font-bold">
                {info?.aggregatedDiscountInfoV3?.header}{" "}
                {info?.aggregatedDiscountInfoV3?.subHeader}
              </span>
            </div>
          )}
        </div>
        <div className="mt-4 w-full px-2 pb-2">
          <h3 className="truncate text-base font-bold text-white lg:text-lg">
            {info?.name}
          </h3>

          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <span className="flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-1 text-emerald-300">
              <svg
                width="16"
                height="16"
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
            <span className="text-slate-400">{info?.sla?.slaString}</span>
          </p>
          <p className="mt-3 truncate text-sm text-slate-300">
            {info?.cuisines?.join(", ")}
          </p>
          <p className="mt-1 truncate text-sm text-slate-400">
            {info?.areaName}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
