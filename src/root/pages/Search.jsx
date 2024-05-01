import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { IMG_SEARCH_URL } from "../../utils/constants";
import useSearchOptions from "../../hooks/useSearchOptions";
import { Link } from "react-router-dom";
import { TbLoader3 } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchData, isLoading } = useSearchOptions(searchQuery);

  const handleSetSearchQuery = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleClearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <section className="">
      <div className="max-w-4xl w-full mx-auto">
        <div className="w-full pb-3 px-3 bg-black pt-[120px] max-w-4xl fixed mx-auto right-0 left-0">
          <div className="relative">
            <input
              className="w-full border placeholder:text-gray-400 border-gray-700 outline-none  pl-3 pr-10 py-2 rounded-md text-sm sm:text-lg  md:text-xl text-white  bg-slate-950  "
              type="text"
              placeholder="Search for restaurants and food..."
              value={searchQuery}
              onChange={handleSetSearchQuery}
            />
            {searchQuery === "" ? (
              <IoSearchOutline className="absolute h-full text-gray-400 right-3 top-0 text-lg sm:text-xl md:text-3xl" />
            ) : (
              <button
                className="absolute text-gray-300 flex sm:top-3 top-[10px]   right-3 md:top-2 text-lg sm:text-xl md:text-3xl"
                onClick={handleClearSearchQuery}
              >
                {" "}
                <RxCross1 />{" "}
              </button>
            )}
          </div>
        </div>
        {searchData && searchData?.length > 0 && (
          <div className="flex flex-col pt-[190px]    gap-5 w-full p-4">
            {searchData?.map((data) => {
              return (
                <Link
                  key={uuidv4()}
                  to={"/"}
                  className="flex gap-2 w-full hover:bg-slate-950 p-3 border border-transparent hover:border hover:border-slate-500 rounded-lg"
                >
                  <div>
                    <img
                      loading="lazy"
                      className="w-[60px] rounded-md"
                      src={IMG_SEARCH_URL + data.cloudinaryId}
                      alt={data.metadata}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-gray-100 text-sm">{data.text}</h3>
                    <p className="text-gray-300 font-light text-xs">
                      {data.type}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {isLoading && searchData?.length === 0 && (
          <div className="pt-[200px] flex justify-center mx-auto">
            <TbLoader3 className="animate-spin text-3xl text-gray-300 " />
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
