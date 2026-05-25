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
  const menuItems = Array.isArray(itemCards) ? itemCards : [];
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
      <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
        <button
          onClick={handleShowMenu}
          className="flex w-full items-center justify-between"
        >
          <span className="text-lg font-bold text-white md:text-xl">
            {title + " "} {"(" + menuItems.length + ")"}
          </span>
          <span className="text-xl text-slate-200 md:text-2xl">
            {showMenu ? <GoChevronUp /> : <GoChevronDown />}
          </span>
        </button>
        <div className="mt-5 flex flex-col gap-6">
          {showMenu &&
            menuItems.map((card) => {
              const isVeg = card?.card?.info?.itemAttribute?.vegClassifier;
              const name = card?.card?.info?.name;
              const isBestseller = card?.card?.info?.isBestseller;
              const price = Math.floor(
                (card?.card?.info?.price ?? card?.card?.info?.defaultPrice) /
                  100
              );
              const description = card?.card?.info?.description;
              const imageID = card?.card?.info?.imageId;
              const imageUrl = imageID
                ? IMG_SMALL_URL + imageID
                : "/assets/imageDefault.png";
              const id = card?.card?.info?.id;
              return (
                <div key={uuidv4()}>
                  <div className="flex w-full items-center justify-between gap-5 border-b border-white/10 pb-6 last:border-b-0">
                    <div className="min-w-0 flex-1">
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
                          <span className="flex items-center gap-1 text-xs text-orange-300 sm:text-sm">
                            <IoIosStar /> Bestseller
                          </span>
                        )}
                      </div>
                      <p className="flex flex-col">
                        <span className="line-clamp-2 text-[15px] font-bold text-white sm:text-base">{name}</span>
                        <span className="text-sm font-semibold text-slate-200">
                          &#8377;{price}
                        </span>
                      </p>
                      <p className="mt-3 line-clamp-2 text-xs text-slate-400 sm:text-sm">
                        {description}
                      </p>
                    </div>
                    <div>
                      <div className="relative size-20 rounded-lg bg-slate-800 sm:size-24">
                        <img
                          className="h-full w-full rounded-lg border border-white/10 object-cover"
                          src={imageUrl}
                          onError={(event) => {
                            if (!event.currentTarget.src.includes("imageDefault.png")) {
                              event.currentTarget.src = "/assets/imageDefault.png";
                            }
                          }}
                          alt=""
                        />
                        <div className="absolute bottom-[-8px] left-0 right-0 mx-auto flex h-8 w-20 items-center justify-between rounded-lg border border-orange-300/40 bg-[#101522] px-2 shadow-lg">
                          {items?.filter((item) => item[0]?.id === id).length ==
                          0 ? (
                            <button
                              className="w-full text-sm font-bold text-orange-300"
                              onClick={() => {
                                addFoodItem(card?.card?.info);
                              }}
                            >
                              Add
                            </button>
                          ) : (
                            <>
                              <button
                                className="font-extrabold text-white"
                                onClick={() => {
                                  decreaseFoodItem(card?.card?.info?.id);
                                }}
                              >
                                -
                              </button>
                              <span className="font-bold text-orange-300">
                                {items &&
                                  items?.find((item) => item[0].id === id)[1]}
                              </span>
                              <button
                                className="font-extrabold text-orange-300"
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
