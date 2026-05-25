import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";
import { useSelector } from "react-redux";

const useSearchOptions = (searchQuery) => {
  const [searchData, setSearchData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const throttleSearchQuery = useThrottle(searchQuery, 500);
  const { latitude, longitude } = useSelector(
    (store) => store.userLocation
  );

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${latitude}&lng=${longitude}&str=${throttleSearchQuery}&trackingId=null`;
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(swiggyUrl)}`;
        
        const res = await fetch(proxyUrl);
        const data = await res.json();
        setSearchData(data?.data?.suggestions);
        data?.data?.suggestions?.length > 0 && setIsLoading(true);
      } catch (error) {
        console.error("Search error : " + error);
      }
    };

    if (throttleSearchQuery.length <= 2) {
      setSearchData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    handleSearch();
  }, [throttleSearchQuery]);

  return {searchData, isLoading};
};

export default useSearchOptions;
