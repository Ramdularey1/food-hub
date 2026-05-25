import { useState } from "react";
import { findRestaurantsFast, findRestaurantsLess300 } from "../../utils/helper";
import { RxCross2 } from "react-icons/rx";

const Filter = ({Restaurant, setRestaurant, setShowExtraData}) => {
    const [filter, setFilter] = useState("filter");
    const chipClass = (name) =>
        `flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition ${
            filter == name
                ? "border-orange-400 bg-orange-500 text-white"
                : "border-white/10 bg-white/[0.05] text-slate-200 hover:border-orange-400/60 hover:bg-white/[0.09]"
        }`;

    return (
        <>
            <button className={chipClass("Fast")}
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
                {filter == "Fast" && <RxCross2 />}
            </button>
            <button className={chipClass("Rating")}
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
                {filter == "Rating" && <RxCross2 />}
            </button>
            <button className={chipClass("Offer")}
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
                {filter == "Offer" && <RxCross2 />}
            </button>
            <button className={chipClass("Veg")}
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
                {filter == "Veg" && <RxCross2 />}
            </button>
            <button className={chipClass("less300")}
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
                Under Rs.300
                {filter == "less300" && <RxCross2 />}
            </button>
            <button className={chipClass("300to600")}
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
                Rs.300 - Rs.600
                {filter == "300to600" && <RxCross2 />}
            </button>
        </>
    );
};
export default Filter;
