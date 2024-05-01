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
        <div onClick={closeLocationMenu} ref={menuRef} className="fixed inset-0 h-full flex-center flex-col bg-black bg-opacity-60 backdrop-blur-sm z-50">
            <div className="flex p-2 flex-col gap-3 max-w-[346.42px] w-full">
                <button onClick={onClose} className="self-end text-lg sm:text-xl md:text-2xl bg-slate-900 hover:border-slate-500 p-1 text-white border border-slate-500 rounded-full transition-all duration-300 hover:scale-90 focus:scale-75">
                    <RxCross1 />
                </button>
                <div className=" w-full flex flex-col gap-3 p-5  max-w-md bg-black border border-slate-500 rounded-xl">
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