import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSwiggyProxyUrl } from "../utils/swiggyProxy";

const defaultFoodCarousel = [
    {
        id: "default-biryani",
        searchText: "Biryani",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
    },
    {
        id: "default-north-indian",
        searchText: "North Indian",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
    },
    {
        id: "default-noodles",
        searchText: "Noodles",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
    },
    {
        id: "default-gulab-jamun",
        searchText: "Gulab Jamun",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Gulab jamun.png",
    },
    {
        id: "default-biryani-2",
        searchText: "Biryani",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
    },
    {
        id: "default-north-indian-2",
        searchText: "North Indian",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
    },
    {
        id: "default-noodles-2",
        searchText: "Noodles",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
    },
    {
        id: "default-gulab-jamun-2",
        searchText: "Gulab Jamun",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Gulab jamun.png",
    },
];

const asArray = (value) => (Array.isArray(value) ? value : []);

const locationFallbacks = {
    lucknow: [
        ["lucknow-royal-kitchen", "Royal Awadhi Kitchen", "Biryani, North Indian, Kebabs", "Hazratganj", "4.5", "30-35 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/11/1071a106-b4a4-4d76-a250-9c6448704af5_795876.jpg"],
        ["lucknow-paneer-house", "Paneer House Lucknow", "Paneer, Indian, Thalis", "Aliganj", "4.3", "25-30 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/15/6208af77-7f60-4bda-a36e-66caadc33749_1079502.jpg"],
        ["lucknow-pizza-corner", "Pizza Corner", "Pizza, Fast Food, Beverages", "Gomti Nagar", "4.2", "30-35 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/28/ed9978fd-aef6-4336-89b8-40a1f57ea00a_238584.JPG"],
        ["lucknow-rolls", "Rolls & Wraps Co.", "Rolls, Wraps, Snacks", "Indira Nagar", "4.1", "25-30 MINS", "FOOD_CATALOG/IMAGES/CMS/2025/4/23/73824578-b2b6-419d-83a9-8efa3860e433_766d4810-d5a3-4e31-b1dd-92981a662cb3.jpeg"],
    ],
    mau: [
        ["mau-spice-kitchen", "Mau Spice Kitchen", "North Indian, Chinese, Snacks", "Sahadatpura", "4.4", "30-35 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/15/6208af77-7f60-4bda-a36e-66caadc33749_1079502.jpg"],
        ["mau-biryani-point", "Mau Biryani Point", "Biryani, Mughlai, Indian", "Munshipura", "4.2", "35-40 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/11/1071a106-b4a4-4d76-a250-9c6448704af5_795876.jpg"],
        ["mau-chaat-corner", "Chaat Corner Mau", "Chaat, Street Food, Sweets", "Mirzahadi Pura", "4.3", "20-25 MINS", "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Gulab jamun.png"],
        ["mau-tandoori-hub", "Tandoori Hub", "Tandoori, Rolls, Fast Food", "Railway Station Road", "4.1", "25-30 MINS", "FOOD_CATALOG/IMAGES/CMS/2025/4/23/73824578-b2b6-419d-83a9-8efa3860e433_766d4810-d5a3-4e31-b1dd-92981a662cb3.jpeg"],
    ],
    default: [
        ["food-hub-kitchen", "Food Hub Kitchen", "North Indian, Paneer, Biryani", "Near you", "4.5", "30-35 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/15/6208af77-7f60-4bda-a36e-66caadc33749_1079502.jpg"],
        ["city-biryani-house", "City Biryani House", "Biryani, Indian, Snacks", "City Center", "4.3", "35-40 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/11/1071a106-b4a4-4d76-a250-9c6448704af5_795876.jpg"],
        ["fresh-pizza-cafe", "Fresh Pizza Cafe", "Pizza, Fast Food, Beverages", "Main Market", "4.4", "30-35 MINS", "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/28/ed9978fd-aef6-4336-89b8-40a1f57ea00a_238584.JPG"],
        ["quick-rolls", "Quick Rolls", "Rolls, Wraps, Fast Food", "Food Street", "4.2", "25-30 MINS", "FOOD_CATALOG/IMAGES/CMS/2025/4/23/73824578-b2b6-419d-83a9-8efa3860e433_766d4810-d5a3-4e31-b1dd-92981a662cb3.jpeg"],
    ],
};

const toRestaurantCard = (restaurant, city) => {
    const [id, name, cuisines, areaName, avgRating, slaString, cloudinaryImageId] = restaurant;

    return {
        info: {
            id: `${city}-${id}`,
            name,
            cloudinaryImageId,
            avgRating,
            avgRatingString: avgRating,
            cuisines: cuisines.split(", "),
            areaName,
            costForTwo: "₹300 for two",
            costForTwoMessage: "₹300 for two",
            sla: {
                deliveryTime: Number(slaString.split("-")[0]) || 30,
                slaString,
            },
        },
    };
};

const getFallbackKey = ({ city, latitude, longitude }) => {
    const cityName = city?.toLowerCase() || "";

    if (cityName.includes("mau")) return "mau";
    if (cityName.includes("lucknow")) return "lucknow";

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (lat > 25.7 && lat < 26.3 && lng > 83.2 && lng < 84) return "mau";
    if (lat > 26.6 && lat < 27.2 && lng > 80.6 && lng < 81.3) return "lucknow";

    return "default";
};

const buildFallbackHomeData = (location) => {
    const fallbackKey = getFallbackKey(location);
    const fallbackRestaurants = locationFallbacks[fallbackKey].map((restaurant) =>
        toRestaurantCard(restaurant, fallbackKey)
    );

    return {
        homeData: [
            { title: "What's on your mind?" },
            defaultFoodCarousel,
            { title: `Top restaurant chains in ${location?.city || "your area"}` },
            fallbackRestaurants,
            { title: "Restaurants with online food delivery" },
            fallbackRestaurants,
            null,
            [],
        ],
        restaurants: fallbackRestaurants,
    };
};

const fetchRestaurantsJson = async (swiggyPath) => {
    const urls = [
        getSwiggyProxyUrl(swiggyPath),
        `https://corsproxy.io/?${encodeURIComponent(
            `https://www.swiggy.com${swiggyPath}`
        )}`,
    ];

    let lastError;

    for (const url of urls) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Request failed with ${res.status}`);

            const json = await res.json();
            if (!Array.isArray(json?.data?.cards)) {
                throw new Error("Restaurant cards missing from response");
            }

            return json;
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError;
};

const hasRestaurants = (restaurants) =>
    restaurants.some((restaurant) => restaurant?.info?.id);

const useRestaurantsData = () => {
    const userLocation = useSelector((store) => store.userLocation);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        getRestaurantsData();
    }, [userLocation]);
    
    const getRestaurantsData = async () => {
        try {
            const swiggyPath = `/dapi/restaurants/list/v5?lat=${userLocation.latitude}&lng=${userLocation.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
            const json = await fetchRestaurantsJson(swiggyPath);
            const cards = asArray(json?.data?.cards);
            
            const topBrand = cards.find(
                (res) => res?.card?.card?.id?.includes("top_brands_for_you")
            );

            const allRests = cards.find(
                (res) => res?.card?.card?.id?.includes("restaurant_grid_listing")
            );

            const allRestsTitle = cards.find(
                (res) => res?.card?.card?.id?.includes("popular_restaurants_title")
            );

            const infoLink = cards.find(
                (res) => res?.card?.card?.id?.includes("whats_on_your_mind")
            );

            const unService = cards.find(
                (res) => res?.card?.card?.id?.includes("swiggy_not_present")
            );

            const infoItems = asArray(
                infoLink?.card?.card?.gridElements?.infoWithStyle?.info
            );
            const topRestaurants = asArray(
                topBrand?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );
            const gridRestaurants = asArray(
                allRests?.card?.card?.gridElements?.infoWithStyle?.restaurants
            );

            const set1 = new Set(
                topRestaurants.map(
                    (item) => item.info.id
                )
            );
            const set2 = new Set(
                gridRestaurants.map(
                    (item) => item.info.id
                )
            );

            const combinedSet = new Set([...set1, ...set2]);
            const allTotalRests = Array.from(combinedSet, (id) => {
                const objInArray1 =
                    topRestaurants.find(
                        (item) => item.info.id === id
                    );
                const objInArray2 =
                    gridRestaurants.find(
                        (item) => item.info.id === id
                    );
                return objInArray1 || objInArray2;
            });

            const additionalRests =
                topRestaurants.filter(
                    (item) => !set2.has(item.info.id)
                );

            const hasAnyRestaurants =
                hasRestaurants(topRestaurants) || hasRestaurants(gridRestaurants);

            setAllRestaurants([
                infoLink?.card?.card?.header || { title: "What's on your mind?" },
                infoItems.length > 0 ? infoItems : defaultFoodCarousel,
                topBrand?.card?.card?.header,
                topRestaurants, 
                allRestsTitle?.card?.card,
                allTotalRests, 
                hasAnyRestaurants ? null : unService?.card?.card, 
                additionalRests, 
            ]);
            setFilteredRestaurants(gridRestaurants);
        } catch (error) {
            const fallback = buildFallbackHomeData(userLocation);
            setAllRestaurants(fallback.homeData);
            setFilteredRestaurants(fallback.restaurants);
            console.error(error);
        }
    };
    return [allRestaurants, filteredRestaurants, setFilteredRestaurants];
};

export default useRestaurantsData;
