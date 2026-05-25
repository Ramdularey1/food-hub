import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useRestaurant = (resId) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  const { latitude, longitude } = useSelector(
    (store) => store.userLocation
  );

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  const getRestaurantMenu = async () => {
    try {
      const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(swiggyUrl)}`;

      const data = await fetch(proxyUrl);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const text = await data.text();
      const json = text ? JSON.parse(text) : {};
      
      const restInfo = json?.data?.cards?.find((res) =>
        res?.card?.card["@type"]?.includes("food.v2.Restaurant") ||
        (res?.card?.card?.info?.id && res?.card?.card?.info?.id == resId) ||
        res?.card?.card?.info?.name
      );

      const restOffer = json?.data?.cards?.find((res) =>
        res?.card?.card?.gridElements?.infoWithStyle["@type"]?.includes(
          "food.v2.OfferInfoWithStyle"
        ) || res?.card?.card?.gridElements?.infoWithStyle?.offers
      );

      const restMenus = json?.data?.cards?.find((res) =>
        res?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((menu) =>
          menu?.card?.card["@type"]?.includes("ItemCategory") || 
          menu?.card?.card?.itemCards
        )
      );

      setRestaurantMenu({ restInfo, restOffer, restMenus });
    } catch (err) {
      console.log(err);
      setRestaurantMenu(null);
    }
  };
  return restaurantMenu;
};

export default useRestaurant;
