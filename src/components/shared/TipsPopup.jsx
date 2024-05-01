import { useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TbLoader2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { addTip } from "../../lib/redux/cartSlice";
import { v4 as uuidv4 } from "uuid";

const TipPopup = ({onClose}) => {
  const [showGreet, setShowGreet] = useState(false);
  const [showLimit, setShowLimit] = useState(false);
  const tipRef = useRef(null);
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const closeTipMenu = (e) => {
    if (e.target === tipRef.current) {
      onClose();
    }
  };

  const handleSetTip = (tipAmount = 0) => {
    setShowGreet(false);
    setShowLimit(false);
    const amount = inputRef.current.value;

    if (amount === "" && tipAmount === 0) {
      return;
    }

    const totalAmount = tipAmount > 0 ? tipAmount : amount;

    if (totalAmount < 10 || totalAmount > 1000) {
      setShowLimit(true);
      return;
    }

    setShowGreet(true);
    setTimeout(() => {
      dispatch(addTip(totalAmount));
      onClose();
    }, 2000);
  };

  useEffect(() => {
    const handleKeyPress = (key) => {
      if (key.key === "Enter") {
        handleSetTip();
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      onClick={closeTipMenu}
      ref={tipRef}
      className="fixed inset-0 h-full flex-center flex-col bg-black bg-opacity-60 backdrop-blur-sm z-50"
    >
      <div className="flex flex-col gap-3 max-w-[350px] w-full">
        <button
          onClick={onClose}
          className="self-end text-base md:text-2xl bg-gray-600 hover:bg-gray-700 p-1 text-white border-2 border-gray-400 rounded-full transition-all duration-300 hover:scale-90 focus:scale-75"
        >
          <RxCross1 />
        </button>
        <div className=" w-full flex flex-col gap-3 p-5  max-w-md bg-black border border-slate-500 rounded-xl">
          <div className="flex items-center gap-3">
            <label className=" text-lg text-gray-200" htmlFor="tip">
              Tip Amount{" "}
            </label>
            <div className="flex flex-1 items-center gap-[2px]">
              <span className="text-gray-200 text-2xl">₹</span>
              <input
                className="flex-1 appearance-none w-full py-1 px-2 leading-tight border text-xl border-gray-400 text-gray-300  rounded shadow focus:outline-none focus:shadow-outline bg-slate-900"
                ref={inputRef}
                type="number"
                placeholder="0"
                id="tip"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[10, 20, 50, 100, 500].map((amount) => (
              <button
                key={uuidv4()}
                className="bg-slate-950 py-1 px-2 text-white rounded-md  text-center flex justify-center hover:bg-slate-900 transition-all ease-out delay-100 border border-gray-500 shadow-md"
                onClick={() => handleSetTip(amount)}
              >
                ₹{amount}
              </button>
            ))}
          </div>

          <button
            className="bg-gradient-to-r from-orange-400 to-red-500 p-2 text-white rounded-md hover:from-orange-500 text-center flex justify-center hover:to-red-600 transition-all ease-out delay-300"
            onClick={handleSetTip}
          >
            {" "}
            {!showGreet ? (
              "Pay Tip"
            ) : (
              <TbLoader2 className="animate-spin text-xl" />
            )}
          </button>
          {showGreet && (
            <p className="bg-[#154819] text-white rounded py-3 px-2 text-center font-extralight text-sm ">
              Thank you for supporting your local restaurants! Your tip is
              greatly appreciated.
            </p>
          )}
          {showLimit && (
            <p className="bg-[#792a27] text-white rounded py-3 px-2 text-center font-extralight text-sm mt-3">
              Please consider tipping amount between ₹10 and ₹1000 to support
              the restaurant staff.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TipPopup;
