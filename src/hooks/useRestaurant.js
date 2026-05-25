import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const fallbackMenuItems = [
  {
    name: "Paneer Butter Masala",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
  },
  {
    name: "Veg Biryani",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
  },
  {
    name: "Masala Dosa",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
  },
  {
    name: "Chole Bhature",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
  },
  {
    name: "Veg Hakka Noodles",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
  },
  {
    name: "Margherita Pizza",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
  },
  {
    name: "Chicken Biryani",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
  },
  {
    name: "Gulab Jamun",
    imageId:
      "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Gulab jamun.png",
  },
];

const getStoredRestaurant = (resId) => {
  try {
    const restaurant =
      JSON.parse(sessionStorage.getItem(`restaurant-${resId}`)) ||
      JSON.parse(sessionStorage.getItem("selectedRestaurant"));

    return restaurant?.id == resId ? restaurant : null;
  } catch (error) {
    return null;
  }
};

const buildFallbackMenu = (resId) => {
  const restaurantInfo = getStoredRestaurant(resId) || {
    id: resId,
    name: "Restaurant",
    areaName: "",
    cuisines: ["Indian", "Fast Food"],
    avgRatingString: "--",
    costForTwoMessage: "₹200 for two",
    sla: {
      slaString: "30-35 mins",
      lastMileTravelString: "",
    },
  };

  const itemCards = fallbackMenuItems.map(({ name, imageId }, index) => ({
    card: {
      info: {
        id: `${resId}-${index + 1}`,
        name,
        price: (149 + index * 30) * 100,
        description: `Freshly prepared ${name.toLowerCase()}.`,
        imageId,
        isBestseller: index < 3,
        itemAttribute: {
          vegClassifier: /chicken|mutton|egg/i.test(name) ? "NONVEG" : "VEG",
        },
      },
    },
  }));

  return {
    restInfo: {
      card: {
        card: {
          info: restaurantInfo,
        },
      },
    },
    restOffer: null,
    restMenus: {
      groupedCard: {
        cardGroupMap: {
          REGULAR: {
            cards: [
              {
                card: {
                  card: {
                    title: "Recommended",
                    itemCards,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
};

const useRestaurant = (resId) => {
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  const { latitude, longitude } = useSelector(
    (store) => store.userLocation
  );

  useEffect(() => {
    if (resId && latitude && longitude) {
      getRestaurantMenu();
    }
  }, [resId, latitude, longitude]);

  const getRestaurantMenu = async () => {
    try {
      const swiggyPath = `/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latitude}&lng=${longitude}&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`;
      const swiggyUrl = `https://www.swiggy.com${swiggyPath}`;
      const proxyUrl = import.meta.env.DEV
        ? `/api/swiggy${swiggyPath}`
        : `https://corsproxy.io/?${encodeURIComponent(swiggyUrl)}`;

      const data = await fetch(proxyUrl);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }

      const text = await data.text();
      const json = text ? JSON.parse(text) : {};
      const cards = json?.data?.cards || [];
      
      const restInfo = cards.find((res) =>
        res?.card?.card?.["@type"]?.includes("food.v2.Restaurant") ||
        res?.card?.card?.["@type"]?.includes("Restaurant") ||
        res?.card?.card?.info?.id == resId ||
        (res?.card?.card?.info?.name && res?.card?.card?.info?.cloudinaryImageId)
      );

      const restOffer = cards.find((res) =>
        res?.card?.card?.gridElements?.infoWithStyle?.["@type"]?.includes(
          "food.v2.OfferInfoWithStyle"
        ) || res?.card?.card?.gridElements?.infoWithStyle?.offers
      );

      const restMenus = cards.find((res) =>
        res?.groupedCard?.cardGroupMap?.REGULAR?.cards?.some((menu) =>
          menu?.card?.card?.["@type"]?.includes("ItemCategory") ||
          menu?.card?.card?.itemCards ||
          menu?.card?.card?.categories
        )
      );

      if (!restInfo || !restMenus) {
        setRestaurantMenu(buildFallbackMenu(resId));
        return;
      }

      setRestaurantMenu({ restInfo, restOffer, restMenus });
    } catch (err) {
      console.log(err);
      setRestaurantMenu(buildFallbackMenu(resId));
    }
  };
  return restaurantMenu;
};

export default useRestaurant;
