import useRestaurant from "../../hooks/useRestaurant";
import { Link, useParams } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import RestaurantProfileOffer from "../../components/shared/RestaurantProfileOffer";
import RestaurantMenuInfo from "../../components/shared/RestaurantMenuInfo";
import RestaurantMenuShimmer from "../../components/shimmers/RestaurantMenuShimmer";
import { IMG_URL } from "../../utils/constants";

const RestaurantMenu = () => {
  const { restaurantID } = useParams();
  const menu = useRestaurant(restaurantID);

  const resCart = {
    name: menu?.restInfo?.card?.card?.info?.name,
    id: menu?.restInfo?.card?.card?.info?.id,
    areaName: menu?.restInfo?.card?.card?.info?.areaName,
    imgUrl: IMG_URL + menu?.restInfo?.card?.card?.info?.cloudinaryImageId,
    distance: menu?.restInfo?.card?.card?.info?.sla,
  };

  if (!menu) {
    return <RestaurantMenuShimmer />;
  }

  return !menu || !resCart.name ? (
    <section className="flex h-screen  justify-center items-center flex-col w-full pt-[120px]">
      <img
        className="rounded-full w-40 sm:w-56 md:w-[400px]"
        src={"/assets/data-not-found.avif"}
      />
      <h3 className=" text-xl sm:text-2xl md:text-4xl font-bold mt-5  text-gray-100 text-center">
        Restaurant Details Not Found
      </h3>
      <p className="sm:text-lg md:text-xl text-gray-200 mt-2">
        Something went wrong.
      </p>
      <Link
        to={`/restaurant/${restaurantID}`}
        className="mt-5 relative inline-flex items-center justify-start px-3 py-1 sm:px-5 sm:py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
      >
        <span className="absolute top-0 right-0 inline-block w-2 h-2 sm:w-4 sm:h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
          <span className="absolute top-0 right-0  w-2 h-2 sm:w-5 sm:h-5 rotate-45 translate-x-1/2 -translate-y-1/2 "></span>
        </span>
        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
        <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex flex-center gap-1">
          Refresh <IoMdRefresh className=" group-hover:animate-pulse text-xl" />
        </span>
      </Link>
    </section>
  ) : (
    <section className="max-w-[800px] mx-auto px-4 pt-[120px]">
      <RestaurantProfileOffer
        offers={
          menu?.restOffer?.card?.card?.gridElements?.infoWithStyle?.offers
        }
        info={menu?.restInfo?.card?.card?.info}
      />
      <RestaurantMenuInfo
        menuInfo={menu?.restMenus?.groupedCard?.cardGroupMap?.REGULAR?.cards}
        resCart={resCart}
      />
    </section>
  );
};

export default RestaurantMenu;
