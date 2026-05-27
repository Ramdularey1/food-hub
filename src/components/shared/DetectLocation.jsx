import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../lib/redux/userLocationSlice";
import { FaLocationArrow } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx"
import { getCityName } from "../../utils/helper";
import { useNavigate } from "react-router-dom";


const DetectLocation = ({onClose} ) => {
    const [isFetching, setIsFetching] = useState(false);
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const { city } = useSelector((store) => store.userLocation);
    const [showLocationError, setShowLocationError] = useState(false);

    const closeLocationMenu = (e) => {
        if (e.target === menuRef.current) {
            onClose();
        }
    }

    const handleDetectLocation = async (locationType) => {
        setShowLocationError(false); 
        if (city !== "Lucknow" && locationType) {
            dispatch(setLocation({
                latitude: 26.8912141, longitude: 81.0648758, city: "Lucknow"
            }))
            onClose();
            navigate("/");
            return;
        } else if(city === "Lucknow" && !locationType){
            // when locationType is null
            
            setIsFetching(true);
            navigator.geolocation.getCurrentPosition(async (location) => {
                try {
                    const { latitude, longitude } = location.coords;
                    const city = await getCityName(latitude, longitude);
                    if (latitude && longitude && city) {
                        dispatch(setLocation({
                            latitude, longitude, city
                        }))
                        onClose();
                        setIsFetching(false);
                        navigate("/");
                    }
                } catch (error) {
                    console.log(error);
                }
            }, () => {
                setShowLocationError(true); 
                setIsFetching(false);
            }, {timeout : 10000})
        }

        
    }

    return (
        <div
            onClick={closeLocationMenu}
            ref={menuRef}
            className="fixed inset-0 z-50 grid h-dvh w-full place-items-center overflow-hidden bg-black/60 p-4 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-sm rounded-lg border border-white/10 bg-[#101522] p-5 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/[0.06] p-2 text-lg text-white transition hover:bg-white/[0.12] sm:text-xl"
                >
                    <RxCross1 />
                </button>
                <div className="mt-10 flex w-full flex-col gap-3">
                    <button disabled={isFetching} className="text-white flex-center gap-2 p-2 md:p-3  bg-slate-900 hover:bg-slate-950 text-base md:text-lg rounded-lg shadow-lg border border-gray-400 disabled:bg-slate-700" onClick={() => { handleDetectLocation(null) }}>
                        {isFetching ? <FaLocationArrow className=" animate-bounce text-red-500 " /> : <FaLocationArrow className="text-red-500" />}
                        Detect current location
                    </button>
                    {showLocationError && <p className="bg-[#d5615d] text-white rounded p-1 px-2 text-center font-extralight text-sm ">We are unable to fetch your location currently.</p>}
                    <div className="w-full flex items-center gap-1">
                        <span className="border-t w-full border-dashed border-gray-400 "></span>
                        <span className="text-center select-none text-white font-extralight text-xs sm:text-sm">OR</span>
                        <span className="border-t w-full border-dashed border-gray-400 "></span>
                    </div>
                    <button className=" text-white flex-center gap-2 p-2 md:p-3  bg-slate-900 hover:bg-slate-950 text-base md:text-lg rounded-lg shadow-lg  border-gray-400 border" onClick={() => { handleDetectLocation("default") }}>
                        Default location
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetectLocation
