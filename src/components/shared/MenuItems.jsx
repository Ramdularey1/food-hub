import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { IoIosStar } from "react-icons/io";
import { IMG_SMALL_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCount,
  increaseCount,
} from "../../lib/redux/cartSlice";
import { useToast } from "../../lib/shadcn/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";
import RestFreshPopup from "./RestFreshPopup";

const MenuItems = (card) => {
  const { title, itemCards, resCart } = card;
  const [showMenu, setShowMenu] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popItem, setPopItem] = useState(null);
  const { items, restaurant } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const closeFreshRestPopup = () => {
    setShowPopUp(false);
  };

  const addFoodItem = (item) => {
    if (restaurant?.id == undefined || restaurant?.id == resCart?.id) {
      dispatch(addToCart({ item: [item, 1], resCart }));
      toast({
        title: "Item added to the cart",
        variant: "",
        description: `${item.name}`,
        action: (
          <ToastAction
            onClick={() => {
              navigate("/checkout");
            }}
            altText="Cart"
          >
            Cart
          </ToastAction>
        ),
      });
    } else {
      setShowPopUp(true);
      setPopItem(item);
    }
  };
  const increaseFoodItem = (i) => {
    dispatch(increaseCount(i));
  };
  const decreaseFoodItem = (i) => {
    dispatch(decreaseCount(i));
  };
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div className="mt-5">
        <button
          onClick={handleShowMenu}
          className="flex justify-between items-center w-full"
        >
          <span className="text-lg md:text-xl font-bold text-gray-200">
            {title + " "} {"(" + itemCards.length + ")"}
          </span>
          <span className="text-xl md:text-2xl text-gray-50">
            {showMenu ? <GoChevronUp /> : <GoChevronDown />}
          </span>
        </button>
        <div className="flex flex-col gap-8 mt-5">
          {showMenu &&
            itemCards.map((card) => {
              const isVeg = card?.card?.info?.itemAttribute?.vegClassifier;
              const name = card?.card?.info?.name;
              const isBestseller = card?.card?.info?.isBestseller;
              const price = Math.floor(
                (card?.card?.info?.price ?? card?.card?.info?.defaultPrice) /
                  100
              );
              const description = card?.card?.info?.description;
              const imageID = card?.card?.info?.imageId;
              const id = card?.card?.info?.id;
              return (
                <div key={uuidv4()}>
                  <div className="flex justify-between items-center border-b pb-6 border-gray-500 w-full">
                    <div className=" w-[80%]">
                      <div className="flex gap-1 item-center">
                        <img
                          className="w-3 md:w-4"
                          src={
                            isVeg === "VEG"
                              ? "/assets/veg.svg"
                              : "/assets/nonveg.svg"
                          }
                          alt=""
                        />
                        {isBestseller && (
                          <span className="text-[#ee9c00] flex items-center gap-1 text-xs sm:text-sm tracking-tighter">
                            <IoIosStar /> Bestseller
                          </span>
                        )}
                      </div>
                      <p className="flex flex-col">
                        <span className="text-gray-200 line-clamp-2 text-[15px] sm:text-base">{name}</span>
                        <span className=" text-sm text-gray-200">
                          &#8377;{price}
                        </span>
                      </p>
                      <p className=" text-xs sm:text-sm font-light text-gray-300 mt-3">
                        {description}
                      </p>
                    </div>
                    <div>
                      <div className="relative size-16 sm:size-20 w-[80px] sm:w-[100px]  rounded-lg bg-slate-800">
                        <img
                          className="w-full h-full  object-cover rounded-lg border border-gray-400"
                          src={
                            imageID
                              ? IMG_SMALL_URL + imageID
                              : "/assets/image.png"
                          }
                          alt=""
                        />
                        <div className="absolute rounded-md w-14 h-6  sm:w-16 sm:h-6 bg-slate-800 border border-slate-300 bottom-[-4px] left-0 right-0 mx-auto items-center px-2 flex justify-between shadow-md">
                          {items?.filter((item) => item[0]?.id === id).length ==
                          0 ? (
                            <button
                              className="w-full text-white font-semibold"
                              onClick={() => {
                                addFoodItem(card?.card?.info);
                              }}
                            >
                              Add
                            </button>
                          ) : (
                            <>
                              <button
                                className="text-gray-100 font-extrabold"
                                onClick={() => {
                                  decreaseFoodItem(card?.card?.info?.id);
                                }}
                              >
                                -
                              </button>
                              <span className="font-bold text-green-500">
                                {items &&
                                  items?.find((item) => item[0].id === id)[1]}
                              </span>
                              <button
                                className="text-green-500 font-extrabold"
                                onClick={() => {
                                  increaseFoodItem(card?.card?.info?.id);
                                }}
                              >
                                +
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {showPopUp && (
        <RestFreshPopup
          onClose={closeFreshRestPopup}
          item={popItem}
          onClick={() => {
            dispatch(addToCart({ item: [popItem, 1], resCart }));
            toast({
              title: "Item added to the cart",
              description: `${popItem.name}`,
              action: (
                <ToastAction
                  onClick={() => {
                    navigate("/checkout");
                  }}
                  altText="Cart"
                >
                  Cart
                </ToastAction>
              ),
            });
          }}
        />
      )}
    </>
  );
};

export default MenuItems;
