import { v4 as uuidv4 } from "uuid";

const RestaurantMenuShimmer = () => {
  return (
    <section className="max-w-[800px] pt-[120px] mx-auto px-4">
      <div className="w-full mt-10">
        <div className="flex justify-between items-center pb-4">
          <div className="flex flex-col gap-1">
            <div className="w-40 rounded-md h-8 bg-slate-500 animate-pulse"></div>
            <div className="w-[100px] mt-3 rounded-md h-4 bg-slate-500 animate-pulse"></div>
            <div className="w-[130px] rounded-md h-4 bg-slate-500 animate-pulse"></div>
          </div>
          <div>
            <div className=" p-1 rounded-lg w-20 h-[65px]  bg-slate-500 animate-pulse"></div>
          </div>
        </div>
        <div className="border-t  border-dashed pt-4">
          <div className="flex gap-1">
            <div className="w-[100px] mt-3 rounded-md h-6 bg-slate-500 animate-pulse"></div>
            <div className="w-[100px] mt-3 rounded-md h-6 bg-slate-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Restaurant Offer */}
      <div className="w-full">
        <div className="flex gap-1 lg:gap-4 overflow-x-scroll scroll-smooth scrollbar-hide w-full  mt-6">
          {Array(10)
            .fill("")
            .map(() => (
              <div
                key={uuidv4()}
                className="border bg-slate-500 animate-pulse p-2 min-w-[200px] h-[50px] rounded-xl"
              >
                <div className="flex items-center gap-1 font-semibold text-gray-700 text-sm   truncate">
                  <div></div>
                  <div></div>
                </div>
                <div className="text-xs font-normal text-gray-500 tracking-[-1.01px]">
                  <div></div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {Array(10)
        .fill("")
        .map(() => (
          <div className="mt-5" key={uuidv4()}>
            <div className="flex justify-between items-center w-full">
              <span className=" w-[160px] mt-3 rounded-md h-6 bg-slate-500bg-gray-200 animate-pulse "></span>
              <span className=" w-7 h-7 mt-3 rounded-full  bg-slate-500 animate-pulse "></span>
            </div>
            <div className="flex flex-col gap-8 mt-5">
              {Array(10)
                .fill("")
                .map(() => {
                  return (
                    <div key={uuidv4()}>
                      <div className="flex justify-between items-center border-b pb-6 border-dashed w-full">
                        <div className=" w-[80%]">
                          <div className="flex gap-1 item-center">
                            <div className="w-[100px] mt-3 rounded-md h-6 bg-slate-500 animate-pulse"></div>
                          </div>
                          <div className="flex flex-col">
                            <div className="w-[100px] mt-3 rounded-md h-3 bg-slate-500 animate-pulse"></div>
                            <div className="w-[100px] mt-3 rounded-md h-3 bg-slate-500 animate-pulse"></div>
                          </div>
                          <div></div>
                        </div>
                        <div>
                          <div className="relative size-20 w-[100px] rounded-lg bg-slate-500 animate-pulse">
                            <div></div>
                            <div className="absolute rounded-md  w-16 h-6 bg-slate-500 border border-gray-300 bottom-[-4px] left-0 right-0 mx-auto items-center px-2 flex justify-between shadow-md animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
    </section>
  );
};

export default RestaurantMenuShimmer;
