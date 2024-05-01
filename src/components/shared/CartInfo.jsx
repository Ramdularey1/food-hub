import { useDispatch } from "react-redux";
import { increaseCount, decreaseCount } from "../../lib/redux/cartSlice";
const CartInfo = ({item}) => {
    const { name, itemAttribute, price, defaultPrice } = item[0];
    const count = item[1];
    const dispatch = useDispatch();

    const addFoodItem = (i) => {
        dispatch(increaseCount(i));
    };

    const removeFoodItem = (i) => {
        dispatch(decreaseCount(i));
    };

    return (
        <div className=" flex justify-between mt-3">
            <div className="flex gap-[2px] items-center">
                <img className="w-[20px]" src={itemAttribute?.vegClassifier == "VEG" ? "/assets/veg.svg" : "/assets/nonveg.svg"} alt="" />
                <p className="text-sm md:text-base text-gray-200 line-clamp-1">{name}</p>
            </div>
            <div className="flex gap-3 items-center">
                <div className="flex items-center w-16 h-7 md:w-20 md:h-8 p-1 px-2 justify-between border ">
                    <button
                        className="font-extrabold text-gray-200"
                        onClick={() => {
                            removeFoodItem(item[0].id);
                        }}
                    >
                        &minus;
                    </button>
                    <span className="font-bold text-green-500">{count}</span>
                    <button
                        className="font-extrabold text-green-500"
                        onClick={() => {
                            addFoodItem(item[0].id);
                        }}
                    >
                        +
                    </button>
                </div>
                <p className="w-[60px] text-right text-gray-200 font-light text-sm md:text-base"><span>₹{price ? Math.floor((price / 100) * count) : Math.floor((defaultPrice / 100) * count)}</span></p>
            </div>
        </div>
    );
};
export default CartInfo;
