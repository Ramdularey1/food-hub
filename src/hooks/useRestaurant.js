import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../utils/constants";
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
      const data = await fetch(
        `${FETCH_MENU_URL}lat=${latitude}&lng=${longitude}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`,
        {
            headers: {
              "x-cors-api-key": "temp_09a95c2e6da960653de51c2deccb8507",
            },
          }
      );

      const json = await data.json();
      
      const restInfo = json?.data?.cards?.find((res) =>
        res?.card?.card["@type"]?.includes("food.v2.Restaurant")
      );

      const restOffer = json?.data?.cards?.find((res) =>
        res?.card?.card?.gridElements?.infoWithStyle["@type"]?.includes(
          "food.v2.OfferInfoWithStyle"
        )
      );

      const restMenus = json?.data?.cards?.find((res) =>
        res?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((menu) =>
          menu?.card?.card["@type"]?.includes("food.v2.ItemCategory")
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
