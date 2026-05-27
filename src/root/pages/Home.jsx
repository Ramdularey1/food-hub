import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useRestaurantsData from "../../hooks/useRestaurantsData";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { IMG_INFO_URL, IMG_NOT_FOUND_URL } from "../../utils/constants";
import RestaurantCard from "../../components/shared/RestaurantCard";
import Filters from "../../components/shared/Filters";
import RestaurantCardShimmer from "../../components/shimmers/RestaurantCardShimmer";
import Footer from "../../components/shared/Footer";
import HomeShimmer from "../../components/shimmers/HomeShimmer";
import { v4 as uuidv4 } from "uuid";
import { handleScrollTop } from "../../utils/helper";

const asArray = (value) => (Array.isArray(value) ? value : []);

window.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
});

const Home = () => {
  const [allRestaurants, filteredRestaurants, setFilteredRestaurants] =
    useRestaurantsData();
  const [loadMoreRest, setLoadMoreRest] = useState(false);
  const [showExtraData, setShowExtraData] = useState(true);
  const [extraRestsData, setExtraRestsData] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const foodCollections = asArray(allRestaurants?.[1]);
  const topRestaurants = asArray(allRestaurants?.[3]);
  const restaurants = asArray(filteredRestaurants);
  const extraRestaurants = asArray(extraRestsData);
  const additionalRestaurants = asArray(allRestaurants?.[7]);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const carouselRef = useRef(null);
  const topRestRef = useRef(null);

  const scrollHandler = (direction, ref) => {
    const element = ref.current;
    if (!element) return;
    if (direction == "left") {
      element.scrollLeft += -(element.clientWidth - element.clientWidth * 0.15);
    } else {
      element.scrollLeft += element.clientWidth - element.clientWidth * 0.15;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const distanceFromBottom =
        documentHeight - (scrollPosition + viewportHeight);
      if (!loadMoreRest) {
        if (distanceFromBottom < 400) {
          setExtraRestsData([]);
          setLoadMoreRest(true);
          setTimeout(() => {
            setExtraRestsData(additionalRestaurants);
          }, 2000);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMoreRest, allRestaurants, additionalRestaurants]);

  if (!allRestaurants) {
    return (
      <div className=" flex justify-center items-center flex-col w-full pt-[120px]">
        <img
          className=" w-56 rounded-full md:w-[400px]"
          src={"assets/data-not-found.avif"}
        />
        <h3 className="text-2xl md:text-4xl mt-4 font-bold  text-gray-100">
          Data Not Found.
        </h3>
        <p className="text-lg md:text-xl text-gray-200 mt-5">
          Something went wrong.
        </p>
        <a
          href="/"
          className="mt-5 relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
        >
          <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
            Try Again
          </span>
        </a>
      </div>
    );
  }
  if (allRestaurants[6]) {
    return (
      <div className=" pt-[120px]  max-w-96 mx-auto ">
        <img
          loading="lazy"
          className="w-full"
          src={allRestaurants[6]?.imageLink}
        />
        <h3 className="text-2xl text-center fonr-bold text-gray-100">
          {allRestaurants[6]?.title}
        </h3>
        <p className="text-center text-lg mt-2 text-gray-200">
          We don’t have any services here till now.
        </p>
      </div>
    );
  }

  return allRestaurants.length === 0 ? (
    <HomeShimmer />
  ) : (
    <main className="min-h-screen bg-[#080b12] text-white">
      {allRestaurants[0] && foodCollections.length > 0 && (
        <section className="container mx-auto border-b border-white/10 px-4 pb-8 pt-32 lg:pt-36">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              {allRestaurants[0]?.title}
            </h2>
            <div className="flex gap-2 text-2xl">
              <button
                onClick={() => {
                  scrollHandler("left", carouselRef);
                }}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-slate-200 transition hover:border-orange-400/60 hover:text-white"
              >
                <BsFillArrowLeftCircleFill />
              </button>
              <button
                onClick={() => {
                  scrollHandler("right", carouselRef);
                }}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-slate-200 transition hover:border-orange-400/60 hover:text-white"
              >
                <BsFillArrowRightCircleFill />
              </button>
            </div>
          </div>
          <div className="my-6 w-full">
            <div
              ref={carouselRef}
              className="flex overflow-x-scroll overflow-y-hidden scroll-smooth rounded-lg scrollbar-hide"
            >
              {foodCollections.map((info) => (
                <Link
                  onClick={() => {
                    handleScrollTop();
                  }}
                  to={
                    info?.action?.link
                      ? "/collections/" +
                        info?.action?.link?.split("=")[1]?.split("&")[0]
                      : "/"
                  }
                  key={"collections" + info?.id}
                >
                  <div className="w-[130px] shrink-0 md:w-40">
                    <img
                      onLoad={handleImageLoad}
                      className={` hover:scale-110 transition-all duration-300 ease-out w-full ${
                        !imageLoaded && "hidden"
                      }`}
                      src={IMG_INFO_URL + info.imageId}
                      alt="dishes image"
                    />
                    <div className={`s-[130px] md:size-40 rounded-full hover:scale-110 transition-all duration-300 ease-out bg-gradient-to-tr from-gray-400 to-gray-800 ${imageLoaded && "hidden"}`}></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {allRestaurants[2] && topRestaurants.length > 0 && (
        <section className="container mx-auto mt-10 border-b border-white/10 px-4 pb-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              {allRestaurants[2]?.title}
            </h2>
            <div className="flex gap-2 text-2xl">
              <button
                onClick={() => {
                  scrollHandler("left", topRestRef);
                }}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-slate-200 transition hover:border-orange-400/60 hover:text-white"
              >
                <BsFillArrowLeftCircleFill />
              </button>
              <button
                onClick={() => {
                  scrollHandler("right", topRestRef);
                }}
                className="rounded-lg border border-white/10 bg-white/[0.05] p-2 text-slate-200 transition hover:border-orange-400/60 hover:text-white"
              >
                <BsFillArrowRightCircleFill />
              </button>
            </div>
          </div>
          <div className="my-6 w-full">
            <div
              ref={topRestRef}
              className="flex gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
            >
              {topRestaurants.map((restaurant) => (
                <RestaurantCard
                  info={restaurant?.info}
                  key={(restaurant?.info?.parentId || restaurant?.info?.id) + uuidv4()}
                />
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="container mx-auto px-4 py-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
            Explore
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {allRestaurants[4]?.title}
          </h2>
        </div>
        <div className="my-6 flex w-full flex-wrap gap-2">
          <Filters
            Restaurant={allRestaurants[5]}
            setRestaurant={setFilteredRestaurants}
            setShowExtraData={setShowExtraData}
          />
        </div>
        {restaurants.length !== 0 ? (
          <div className="grid grid-cols-1 place-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard info={restaurant?.info} key={restaurant?.info?.id || uuidv4()} />
            ))}
            {showExtraData &&
              (!extraRestsData
                ? null
                : extraRestaurants.length === 0
                ? Array(additionalRestaurants.length)
                    .fill("")
                    .map(() => <RestaurantCardShimmer key={uuidv4()} />)
                : extraRestaurants.map((restaurant) => (
                    <RestaurantCard
                      info={restaurant?.info}
                      key={(restaurant?.info?.parentId || restaurant?.info?.id) + uuidv4()}
                    />
                  )))}
          </div>
        ) : (
          <div className="body-box search-empty">
            <p>No Restaurant Found !!</p>
            <img src={IMG_NOT_FOUND_URL} />
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Home;
