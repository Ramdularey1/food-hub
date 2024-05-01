import { useEffect, useState } from "react";
import { FETCH_SEARCH_URL } from "../utils/constants";
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
        const res = await fetch(
          `${FETCH_SEARCH_URL}lat=${latitude}&lng=${longitude}&str=${throttleSearchQuery}&trackingId=null`,
          {
            headers: {
              "x-cors-api-key": "temp_09a95c2e6da960653de51c2deccb8507",
            },
          }
        );
        const data = await res.json();
        setSearchData(data?.data?.suggestions);
        data.data.suggestions.length > 0 && setIsLoading(true);
      } catch (error) {
        console.error("Search error : " + error);
      }
    };
    // if throttleSearchQuery string length is less than 2 => 0, 1 : simply return don't make any api calls
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
