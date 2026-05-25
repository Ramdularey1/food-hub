import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useRestaurantsData = () => {
    const userLocation = useSelector((store) => store.userLocation);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);

    useEffect(() => {
        getRestaurantsData();
    }, [userLocation]);
    
    const getRestaurantsData = async () => {
        try {
            const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${userLocation.latitude}&lng=${userLocation.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(swiggyUrl)}`;
            
            const res = await fetch(proxyUrl);
            const json = await res.json();
            const cards = json?.data?.cards;

            if (!Array.isArray(cards)) {
                throw new Error(json?.error || "Restaurant data not found");
            }
            
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

            const infoItemsData =
                infoLink?.card?.card?.gridElements?.infoWithStyle?.info;
            const topRestaurantsData =
                topBrand?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            const gridRestaurantsData =
                allRests?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            const infoItems = Array.isArray(infoItemsData) ? infoItemsData : [];
            const topRestaurants = Array.isArray(topRestaurantsData)
                ? topRestaurantsData
                : [];
            const gridRestaurants = Array.isArray(gridRestaurantsData)
                ? gridRestaurantsData
                : [];

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
                infoLink?.card?.card?.header,
                infoItems,
                topBrand?.card?.card?.header,
                topRestaurants, 
                allRestsTitle?.card?.card,
                allTotalRests, 
                unService?.card?.card, 
                additionalRests, 
            ]);
            setFilteredRestaurants(gridRestaurants);
        } catch (error) {
            setAllRestaurants(null);
            setFilteredRestaurants([]);
            console.error(error);
        }
    };
    return [allRestaurants, filteredRestaurants, setFilteredRestaurants];
};

export default useRestaurantsData;
