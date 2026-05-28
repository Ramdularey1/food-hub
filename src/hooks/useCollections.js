import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSwiggyProxyUrl } from "../utils/swiggyProxy";

const useCollections = (collectionId) => {
    const { latitude, longitude } = useSelector((store) => store.userLocation);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        getCollection();
    }, []);

    const getCollection = async () => {
        try {
            const swiggyPath = `/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&collection=${collectionId}&tags=layout_BAU_Contextual%2Ckachori&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
            const proxyUrl = getSwiggyProxyUrl(swiggyPath);
            
            const data = await fetch(proxyUrl);
            const json = await data.json();
            const restInfo = json?.data?.cards;
            setRestaurant(restInfo);
        } catch (err) {
            console.log(err);
            setRestaurant(null);
        }
    };
    return restaurant;
};

export default useCollections;
