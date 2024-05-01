const RestaurantCardShimmer = () => {

    return (
        <div className="min-w-[270px] min-h-[272px] md:w-[290px] md:h-[289px] ">
            <div className="w-full h-full p-2 flex flex-col gap-[2px] rounded-xl">
                <div className="relative h-[181px]">
                    <div  className="w-full h-full bg-slate-500  animate-pulse  rounded-xl relative" />
                </div>
                <div className="w-[161px] md:w-[262px] mt-2 flex flex-col gap-[2px]">
                    <div className=" rounded-full h-[14px] md:h-[20px]  animate-pulse bg-slate-400"></div>
                    <div className=" rounded-full h-[14px] md:h-[20px] w-[60px] md:w-[100px] animate-pulse bg-blue-300"></div>
                    <div className=" rounded-full h-[14px] md:h-[20px] w-[90px] md:w-[140px] animate-pulse bg-gray-400"></div>
                    <div className=" rounded-full h-[14px] md:h-[20px] w-[130px] md:w-[200px] animate-pulse bg-gray4200"></div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCardShimmer