import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSwiggyProxyUrl } from "../utils/swiggyProxy";

const defaultFoodCarousel = [
    {
        id: "default-biryani",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
    },
    {
        id: "default-north-indian",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
    },
    {
        id: "default-noodles",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
    },
    {
        id: "default-gulab-jamun",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Gulab jamun.png",
    },
    {
        id: "default-biryani-2",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Biryani.png",
    },
    {
        id: "default-north-indian-2",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2025/1/24/05a939eb-fd4e-4308-b989-d1c54f4421b3_northindian1.png",
    },
    {
        id: "default-noodles-2",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Noodles.png",
    },
    {
        id: "default-gulab-jamun-2",
        imageId:
            "MERCHANDISING_BANNERS/IMAGES/MERCH/2024/7/2/6ef07bda-b707-48ea-9b14-2594071593d1_Gulab jamun.png",
    },
];

const asArray = (value) => (Array.isArray(value) ? value : []);

const fallbackRestaurants = [
    {
        info: {
            id: "fallback-1",
            name: "Food Hub Kitchen",
            cloudinaryImageId:
                "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/15/6208af77-7f60-4bda-a36e-66caadc33749_1079502.jpg",
            avgRating: 4.5,
            cuisines: ["North Indian", "Paneer", "Biryani"],
            areaName: "Near you",
            costForTwo: "₹300 for two",
            sla: {
                deliveryTime: 30,
                slaString: "30-35 MINS",
            },
        },
    },
    {
        info: {
            id: "fallback-2",
            name: "Biryani & Curry House",
            cloudinaryImageId:
                "RX_THUMBNAIL/IMAGES/VENDOR/2025/4/11/1071a106-b4a4-4d76-a250-9c6448704af5_795876.jpg",
            avgRating: 4.3,
            cuisines: ["Biryani", "Indian", "Snacks"],
            areaName: "City Center",
            costForTwo: "₹250 for two",
            sla: {
                deliveryTime: 35,
                slaString: "35-40 MINS",
            },
        },
    },
    {
        info: {
            id: "fallback-3",
            name: "Pizza Corner",
            cloudinaryImageId:
                "RX_THUMBNAIL/IMAGES/VENDOR/2024/7/28/ed9978fd-aef6-4336-89b8-40a1f57ea00a_238584.JPG",
            avgRating: 4.4,
            cuisines: ["Pizza", "Fast Food", "Beverages"],
            areaName: "Main Market",
            costForTwo: "₹400 for two",
            sla: {
                deliveryTime: 32,
                slaString: "30-35 MINS",
            },
        },
    },
    {
        info: {
            id: "fallback-4",
            name: "Rolls & Wraps Co.",
            cloudinaryImageId:
                "FOOD_CATALOG/IMAGES/CMS/2025/4/23/73824578-b2b6-419d-83a9-8efa3860e433_766d4810-d5a3-4e31-b1dd-92981a662cb3.jpeg",
            avgRating: 4.2,
            cuisines: ["Rolls", "Wraps", "Fast Food"],
            areaName: "Food Street",
            costForTwo: "₹200 for two",
            sla: {
                deliveryTime: 28,
                slaString: "25-30 MINS",
            },
        },
    },
];

const fallbackHomeData = [
    { title: "What's on your mind?" },
    defaultFoodCarousel,
    { title: "Top restaurant chains near you" },
    fallbackRestaurants,
    { title: "Restaurants with online food delivery" },
    fallbackRestaurants,
    null,
    [],
];

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
            const proxyUrl = getSwiggyProxyUrl(swiggyPath);
            
            const res = await fetch(proxyUrl);
            const json = await res.json();
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

            setAllRestaurants([
                infoLink?.card?.card?.header || { title: "What's on your mind?" },
                infoItems.length > 0 ? infoItems : defaultFoodCarousel,
                topBrand?.card?.card?.header,
                topRestaurants, 
                allRestsTitle?.card?.card,
                allTotalRests, 
                gridRestaurants.length || topRestaurants.length ? null : unService?.card?.card, 
                additionalRests, 
            ]);
            setFilteredRestaurants(gridRestaurants);
        } catch (error) {
            setAllRestaurants(fallbackHomeData);
            setFilteredRestaurants(fallbackRestaurants);
            console.error(error);
        }
    };
    return [allRestaurants, filteredRestaurants, setFilteredRestaurants];
};

export default useRestaurantsData;
