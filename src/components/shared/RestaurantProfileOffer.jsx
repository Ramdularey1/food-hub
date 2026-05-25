import { OFFER_LOGO_URL } from "../../utils/constants";
import { v4 as uuidv4 } from "uuid";

const RestaurantProfileOffer = ({offers, info}) => {
    const {
        name,
        cuisines = [],
        areaName,
        sla,
        avgRatingString,
        totalRatingsString,
        costForTwoMessage,
    } = info || {};

    return (
        <>
            {/* Restaurant Info */}
            <div className="mt-5 w-full rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-lg shadow-black/10">
                <div className="flex items-start justify-between gap-5 pb-5">
                    <div>
                        <h2 className="text-2xl font-bold text-white md:text-3xl">{name}</h2>
                        <p className="mt-2 text-sm text-slate-300">{cuisines.join(", ")}</p>
                        <p className="mt-1 text-sm text-slate-400">{areaName}{sla?.lastMileTravelString ? `, ${sla?.lastMileTravelString}` : ""}</p>
                    </div>
                    <div>
                        <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-2">
                            <p className="flex justify-center flex-col   mx-auto">
                                <span className="flex items-center gap-1 border-b border-emerald-400/20 pb-2 text-sm font-bold text-emerald-300 sm:text-base"><svg className=" w-4 sm:w-5" width="20" height="20" viewBox="0 0 20 20" fill="none" role="img" aria-hidden="true" stopColor="rgba(2, 6, 12, 0.92)" ><circle cx="10" cy="10" r="9" fill="url(#StoreRating20_svg__paint0_linear_32982_71567)"></circle><path d="M10.0816 12.865C10.0312 12.8353 9.96876 12.8353 9.91839 12.865L7.31647 14.3968C6.93482 14.6214 6.47106 14.2757 6.57745 13.8458L7.27568 11.0245C7.29055 10.9644 7.26965 10.9012 7.22195 10.8618L4.95521 8.99028C4.60833 8.70388 4.78653 8.14085 5.23502 8.10619L8.23448 7.87442C8.29403 7.86982 8.34612 7.83261 8.36979 7.77777L9.54092 5.06385C9.71462 4.66132 10.2854 4.66132 10.4591 5.06385L11.6302 7.77777C11.6539 7.83261 11.706 7.86982 11.7655 7.87442L14.765 8.10619C15.2135 8.14085 15.3917 8.70388 15.0448 8.99028L12.7781 10.8618C12.7303 10.9012 12.7095 10.9644 12.7243 11.0245L13.4225 13.8458C13.5289 14.2757 13.0652 14.6214 12.6835 14.3968L10.0816 12.865Z" fill="white"></path><defs><linearGradient id="StoreRating20_svg__paint0_linear_32982_71567" x1="10" y1="1" x2="10" y2="19" gradientUnits="userSpaceOnUse"><stop stopColor="#21973B"></stop><stop offset="1" stopColor="#128540"></stop></linearGradient></defs></svg>{avgRatingString || "-- --"}</span>
                                <span className="pt-1 text-xs text-slate-300">
                                    {totalRatingsString || "0+ ratings"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-dashed border-white/15 pt-4">
                    <ul className="flex flex-wrap items-center gap-3 *:font-bold *:text-white">
                        <li className="flex text-sm gap-1 items-center">
                            <svg className=" w-3 sm:w-[18px]" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="#ffffff" strokeWidth="1.3"></circle><path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="#ffffff"></path></svg>
                            <span className="text-xs sm:text-sm md:text-base">{sla?.slaString || "30-35 MINS"}</span>
                        </li>
                        <li className="flex gap-1 items-center ">
                            <svg className=" w-3 sm:w-[18px]" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none"><circle cx="9" cy="9" r="8.25" stroke="#ffffff" strokeWidth="1.5"></circle><path d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z" fill="#ffffff"></path></svg>
                            <span className="text-xs sm:text-sm md:text-base">{costForTwoMessage}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Restaurant Offer */}
            <div className="w-full">
            <div className="mt-6 flex w-full gap-3 overflow-x-scroll scroll-smooth scrollbar-hide">
                {offers?.map(({info}) => (
                    <div key={uuidv4()} className="min-w-[220px] rounded-lg border border-white/10 bg-white/[0.04] p-3">
                        <div className="flex items-center gap-2 font-semibold text-slate-200">
                            <img src={OFFER_LOGO_URL + info?.offerLogo} alt={info.description} />
                            <h4 className="text-sm md:text-base">{info.header}</h4>
                        </div>
                        <div className="mt-1 text-xs font-normal text-slate-400">
                            <p>{info?.couponCode + " | " + info?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    )
}

export default RestaurantProfileOffer
