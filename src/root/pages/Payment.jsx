import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { clearCart } from "../../lib/redux/cartSlice";
const Payment = () => {
  const { tipAmount, items, restaurant } = useSelector((store) => store.cart);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [isPaymentDone, setIsPaymentDone] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePaymentDone = () => {
    setIsPaymentDone(true);
    let timer = setTimeout(() => {
      setIsPaymentDone(false);
      dispatch(clearCart());
      navigate("/");
      clearTimeout(timer);
    }, 3000);
  }

  useEffect(() => {
    setTotalItemPrice(
      items.reduce((totalSum, currentItem) => {
        const itemPrice = currentItem[0]?.defaultPrice
          ? currentItem[0]?.defaultPrice
          : currentItem[0]?.price;
        return Math.floor(totalSum + (itemPrice / 100) * currentItem[1]);
      }, 0)
    );
  }, [items]);

  useEffect(() => {
    const updatedTotalPrice = totalItemPrice + 40 + Number(tipAmount) + 40;
    setTotalPrice(updatedTotalPrice);
  }, [tipAmount, totalItemPrice]);

  // if the cart is empty redirect to the home page
  if (!restaurant) {
    return Navigate({ to: "/" });
  }

  return (
    <>
      <header className={`bg-red-400 ${isPaymentDone && "hidden"}`}>
        <nav className="fixed top-0 w-full flex items-center py-2 pointer-events-none bg-black border-b border-gray-700 z-50 justify-center">
          <Link to={"/"}>
            <img
              src="/assets/logo.svg"
              alt="logo"
              className="object-contain h-10 w-auto  md:flex"
            />
          </Link>
        </nav>
      </header>

      <div className={`flex-1 mt-16 md:flex-initial w-full lg:w-[920px] py-8 px-4 md:p-8 gap-8 md:rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden mx-auto h-screen my-auto ${isPaymentDone && "hidden"} `}>
        <div className="flex flex-col">
          <div className="flex md:hidden mb-6 items-center">
            <img
              src="/assets/logo.svg"
              alt="logo"
              className="object-contain h-3 md:h-8 w-auto hidden md:flex"
            />
            <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
          </div>
          <h2 className="text-xl font-semibold text-gray-100 mb-4">
            Payment Details
          </h2>
          <div className="grid gap-5 *:text-gray-100">
            <div className="grid gap-1 ">
              <label
                className="text-sm font-medium text-primary"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                className="px-2.5 h-10 rounded-md border border-neutral-300 focus:outline-grey-300  bg-slate-900 text-white outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Name"
                name="name"
                defaultValue=""
                required
              />
            </div>
            <div className="min-h-[64px] w-full">
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium text-primary"
                  htmlFor="phone"
                >
                  Phone (WhatsApp enabled to access later)
                </label>
                <input
                  autoComplete="tel"
                  className="px-2.5 h-10 rounded-md border border-neutral-300 focus:outline-grey-300 autofill:bg-white bg-slate-900 text-white outline-none focus:ring-blue-500 focus:border-blue-500"
                  id="phone"
                  placeholder="Enter Phone"
                  type="number"
                  name="phone"
                  required
                />
              </div>
            </div>
            <div className="min-h-[64px] w-full">
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium text-primary"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows={5}
                  className="block p-2.5 text-sm   rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-slate-900 text-white outline-none"
                  placeholder="Flat No. 302, XYZ Apartment Main Street, Ashok Nagar South Delhi District
110021 New Delhi"
required
                ></textarea>
              </div>
            </div>
            <div className="relative">
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium text-primary"
                  htmlFor="couponCode"
                >
                  Coupon Code
                </label>
                <input
                  id="couponCode"
                  className="px-2.5 h-10 rounded-md border border-neutral-300 focus:outline-grey-300 autofill:bg-white pr-16 bg-slate-900 text-white outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Coupon Code"
                  name="couponCode"
                  
                />
              </div>
              <button className="absolute font-medium text-sm  z-10 right-2 top-[34px] disabled:opacity-50 transition-opacity">
                Apply
              </button>
            </div>
            <div className="relative border-t pt-4">
              <div className="grid gap-1">
                <label
                  className="text-sm font-medium text-primary"
                  htmlFor="upiID"
                >
                  Your UPI ID
                </label>
                <input
                  id="upiID"
                  className="px-2.5 pl-[52px] h-10 rounded-md border border-neutral-300 focus:outline-grey-300 autofill:bg-white pr-16 bg-slate-900 text-white outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the UPI ID"
                  name="upiID"
                  required
                />
              </div>
              <img
                width={40}
                className="absolute font-medium text-sm text-[#202020] z-10 left-2 top-[50px] disabled:opacity-50 transition-opacity"
                src="assets/upi-ar21.svg"
                alt="upi"
              />
              <button className="absolute font-medium text-sm  z-10 right-2 top-[50px] disabled:opacity-50 transition-opacity">
                Verify
              </button>
            </div>
            <div className="flex flex-col">
              <button onClick={handlePaymentDone} className="mt-auto w-full h-12 bg-black-600 flex justify-center items-center rounded-md  outline-none font-bold text-white bg-primary border border-gray-500 hover:bg-slate-950">
                Pay ₹{totalPrice}
              </button>
            </div>
          </div>
        </div>
        <div className="fixed  top-0 left-0 w-screen h-full overflow-auto min-h-screen py-8 px-4 flex-col mb-28 pb-24 md:mb-0 md:static md:w-full md:min-h-fit md:p-0 z-20 hidden md:flex">
          <div className="flex items-center mb-6 md:mb-3">
            <img
              alt="The Freelance Freedom"
              src="https://d3o9zigtf206n3.cloudfront.net/onboarding-files/650ac2ccab13ae0be4b1f248/app-logo/Soch logo round.png"
              className="md:hidden shrink-0 rounded-md h-4 w-auto object-contain mr-4"
            />
            <h2 className="text-lg md:text-2xl text-white font-bold">
              {restaurant?.name}
            </h2>
          </div>
          <div>
            <div className="prose prose-neutral  overflow-hidden mb-2 font-medium whitespace-break-spaces">
              <p className="text-base text-gray-200 font-light">
                {restaurant?.areaName}
              </p>
              <p className="text-sm text-gray-200 font-light">
                {items.length} items
              </p>
            </div>
          </div>
          <div className="relative w-full aspect-video">
            <img
              alt={`${restaurant?.name} logo`}
              loading="lazy"
              decoding="async"
              className="rounded-md object-cover"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                left: "0",
                top: "0",
                right: "0",
                bottom: "0",
                color: "transparent",
              }}
              sizes="100vw"
              src={restaurant?.imgUrl}
            />
          </div>

          <footer className="fixed md:hidden w-full left-0 bottom-0 py-5 px-4  flex justify-center items-center">
            <button className="w-full h-12 bg-black-600 rounded-md border-none outline-none font-bold text-white hover:bg-primary ">
              Continue
            </button>
          </footer>
        </div>
      </div>
      {
        isPaymentDone && <div className={`w-screen h-screen flex justify-center items-center bg-black`}>
          <div>
            <img src="/assets/paymentdonegif-unscreen.gif" alt="payment done gif" />
          </div>
          <audio autoPlay src="/assets/paymentdone-audio.mp3"></audio>
        </div>
      }
    </>
  );
};

export default Payment;
