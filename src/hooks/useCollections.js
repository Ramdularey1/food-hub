import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useCollections = (collectionId) => {
    const { latitude, longitude } = useSelector((store) => store.userLocation);
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        getCollection();
    }, []);

    const getCollection = async () => {
        try {
            const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&collection=${collectionId}&tags=layout_BAU_Contextual%2Ckachori&sortBy=&filters=&type=rcv2&offset=0&page_type=null`;
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(swiggyUrl)}`;
            
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
