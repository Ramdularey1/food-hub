import { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoMdCart } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { deleteTip } from "../../lib/redux/cartSlice";
import TipPopup from "../../components/shared/TipsPopup";
const CartInfo = lazy(() => import("../../components/shared/CartInfo"));

const Cart = () => {
  const cartItems = useSelector((store) => store.cart);
  const { tipAmount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [showTipPopup, setShowTipPopup] = useState(false);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleShowTipPopup = () => {
    setShowTipPopup(!showTipPopup);
  };
  const handleRemovePopup = () => {
    dispatch(deleteTip());
  };

  useEffect(() => {
    const totalPrice = cartItems.items.reduce((totalSum, currentItem) => {
      const itemPrice = currentItem[0]?.defaultPrice
        ? currentItem[0]?.defaultPrice
        : currentItem[0]?.price;
      return Math.floor(totalSum + (itemPrice / 100) * currentItem[1]);
    }, 0);
    setTotalItemPrice(totalPrice);
  }, [cartItems, totalItemPrice]);

  useEffect(() => {
    const updatedTotalPrice = Math.floor(
      totalItemPrice + 40 + Number(tipAmount) + 40
    );
    setTotalPrice(updatedTotalPrice);
  }, [totalItemPrice, tipAmount]);

  if (!cartItems.restaurant) {
    return (
      <section className=" flex container mx-auto pt-20 justify-center items-center flex-col">
        <img src={"assets/emptycart.avif"} className="max-w-[430px] w-full" />
        <h1 className="text-xl mt-4 font-semibold text-gray-200">
          Your cart is empty
        </h1>
        <p className="text-base font-light text-gray-400 text-center">
          You can go to home page to view more restaurants
        </p>
        <Link
          to="/"
          className="bg-[#d74112] hover:bg-orange-700 transition-all delay-100 mt-4 text-white p-2 md:p-2 md:px-4 rounded-lg"
        >
          <button>SEE RESTAURANTS NEAR YOU</button>
        </Link>
      </section>
    );
  }

  return (
    <section className="px-2 mx-auto h-screen pt-20">
      <div className="max-w-screen-sm mx-auto mt-10 border border-gray-600 rounded-lg max-h-[570px] overflow-scroll px-3 md:px-8 pt-8">
        <h1 className=" text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-100 my-1 flex items-center gap-1 justify-center">
          Cart <IoMdCart />
        </h1>
        <p className="text-sm md:text-lg font-light text-center text-gray-300 uppercase pb-4">
          Secure Checkout{" "}
        </p>
        <div className="flex gap-3 justify-between py-1 border-y border-dashed border-gray-700">
          {cartItems?.restaurant && (
            <img
              className="rounded-lg max-w-[100px] w-full"
              src={cartItems?.restaurant?.imgUrl}
            ></img>
          )}
          <div className="">
            <h3 className="text-base sm:text-lg md:text-xl text-gray-100 font-semibold">
              {cartItems?.restaurant?.name}
            </h3>
            <p className="text-sm md:text-base text-gray-300 font-light">
              {cartItems?.restaurant?.areaName}
            </p>
            <p className="text-sm text-gray-300 font-light">
              {cartItems?.items.length} items
            </p>
          </div>
        </div>
        <div>
          {cartItems.items.length > 0 &&
            cartItems?.items?.map((item) => {
              return <CartInfo item={item} key={uuidv4()} />;
            })}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-700 flex flex-col gap-1  border-dashed ">
          <h4 className="text-[17px] md:text-lg font-semibold text-gray-200">
            Bill Details
          </h4>
          <div className="flex w-full justify-between items-center text-sm text-gray-200">
            <span>Item Total</span>
            <span>₹{totalItemPrice}</span>
          </div>
          <div className="flex w-full justify-between items-center text-sm text-gray-200">
            <span>Delivery Fee</span>
            <span>₹40</span>
          </div>

          <div className="flex w-full justify-between items-center text-sm text-gray-200 border-t border-slate-600  mt-2 pt-2">
            <span>Delivery Tip</span>
            <div className="flex items-center gap-1">
              {tipAmount > 0 && <span className="">₹{tipAmount}</span>}
              <button
                className="text-white border-gray-100 border p-[2px] px-2 rounded-full bg-slate-950 hover:bg-slate-800"
                onClick={handleShowTipPopup}
              >
                {tipAmount > 0 ? "Change Tip" : "Add Tip"}
              </button>
              {tipAmount > 0 && (
                <button
                  className="text-red-500  text-lg border-gray-700 border p-[2px] rounded-full"
                  onClick={handleRemovePopup}
                >
                  <RxCross2 />
                </button>
              )}
            </div>
          </div>
          {showTipPopup && <TipPopup onClose={() => setShowTipPopup(false)} />}
          <div className="flex w-full justify-between items-center text-sm text-gray-200 border-b-2 mb-3 pb-3 border-gray-500">
            <span>GST and Restaurant Charges</span>
            <span>₹40</span>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-between items-center text-gray-200 text-lg sm:text-xl md:text-2xl   max-w-screen-sm mx-auto mt-2 px-1">
        <span>To Pay ₹{totalPrice}</span>
        <Link
          to={"/payments"}
          className="border-[1px] bg-blue-950 hover:bg-blue-900 font-light border-gray-500 px-2 py-1 rounded-md "
        >
          Make Payment
        </Link>
      </div>
    </section>
  );
};

export default Cart;
