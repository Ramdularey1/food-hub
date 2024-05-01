import { useState } from "react";
import { findRestaurantsFast, findRestaurantsLess300 } from "../../utils/helper";
import { RxCross2 } from "react-icons/rx";

const Filter = ({Restaurant, setRestaurant, setShowExtraData}) => {
    const [filter, setFilter] = useState("filter");
    return (
        <>
            <button className={`flex gap-1 lg:gap-2 items-center border px-2 lg:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all delay-200 text-sm lg:text-base ${filter == "Fast" && "bg-gray-200 hover:bg-white border-gray-900"}`}
                onClick={() => {
                    findRestaurantsFast(
                        Restaurant,
                        setRestaurant,
                        "Fast",
                        filter,
                        setFilter
                    );
                    setShowExtraData(false);
                }}
                id={filter == "Fast" ? "filterSelected" : ""}
            >
                Fast Delivery
                {filter == "Fast" && <RxCross2 className="border rounded-full border-gray-400" />}
            </button>
            <button className={`flex gap-1 lg:gap-2 items-center border px-2 lg:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all delay-200 text-sm lg:text-base ${filter == "Rating" && "bg-gray-200 hover:bg-white border-gray-900"}`}
                onClick={() => {
                    findRestaurantsFast(
                        Restaurant,
                        setRestaurant,
                        "Rating",
                        filter,
                        setFilter,
                        setShowExtraData
                    );
                    setShowExtraData(false);
                }}
                id={filter == "Rating" ? "filterSelected" : ""}
            >
                Ratings 4.0+
                {filter == "Rating" && <RxCross2 className="border rounded-full border-gray-400" />}
            </button>
            <button className={`flex gap-1 lg:gap-2 items-center border px-2 lg:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all delay-200 text-sm lg:text-base ${filter == "Offer" && "bg-gray-200 hover:bg-white border-gray-900"}`}
                onClick={() => {
                    findRestaurantsFast(
                        Restaurant,
                        setRestaurant,
                        "Offer",
                        filter,
                        setFilter,
                        setShowExtraData
                    );
                    setShowExtraData(false);
                }}
                id={filter == "Offer" ? "filterSelected" : ""}
            >
                Offers
                {filter == "Offer" && <RxCross2 className="border rounded-full border-gray-400" />}
            </button>
            <button className={`flex gap-1 lg:gap-2 items-center border px-2 lg:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all delay-200 text-sm lg:text-base ${filter == "Veg" && "bg-gray-200 hover:bg-white border-gray-900"}`}
                onClick={() => {
                    findRestaurantsFast(
                        Restaurant,
                        setRestaurant,
                        "Veg",
                        filter,
                        setFilter,
                        setShowExtraData
                    );
                    setShowExtraData(false);
                }}
                id={filter == "Veg" ? "filterSelected" : ""}
            >
                Pure Veg
                {filter == "Veg" && <RxCross2 className="border rounded-full border-gray-400" />}
            </button>
            <button className={`flex gap-1 lg:gap-2 items-center border px-2 lg:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all delay-200 text-sm lg:text-base ${filter == "less300" && "bg-gray-200 hover:bg-white border-gray-900"}`}
                onClick={() => {
                    findRestaurantsLess300(
                        Restaurant,
                        setRestaurant,
                        "less300",
                        filter,
                        setFilter,
                        setShowExtraData
                    );
                    setShowExtraData(false);
                }}
                id={filter == "less300" ? "filterSelected" : ""}
            >
                Less then Rs.300
                {filter == "less300" && <RxCross2 className="border rounded-full border-gray-400" />}
            </button>
            <button className={`flex gap-1 lg:gap-2 items-center border px-2 lg:px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all delay-200 text-sm lg:text-base ${filter == "300to600" && "bg-gray-200 hover:bg-white border-gray-900"}`}
                onClick={() => {
                    findRestaurantsLess300(
                        Restaurant,
                        setRestaurant,
                        "300to600",
                        filter,
                        setFilter,
                        setShowExtraData
                    );
                    setShowExtraData(false);
                }}
                id={filter == "300to600" ? "filterSelected" : ""}
            >
                Rs.300-Rs.600
                {filter == "300to600" && <RxCross2 className="border rounded-full border-gray-400" />}
            </button>
        </>
    );
};
export default Filter;