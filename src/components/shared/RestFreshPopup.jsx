import { useRef } from 'react'
import { RxCross1 } from 'react-icons/rx';

const RestFreshPopup = ({item, onClose, onClick}) => {

    const menuRef = useRef(null);
    const closeFreshRestPopup = (e) => {
        if (e.target === menuRef.current) {
            onClose();
        }
    }

    const startFresh = () => {
        // set the fresh restaurant items into the cart
        onClick();
        // close the popup
        onClose();
    }

    return (
        <div onClick={closeFreshRestPopup} ref={menuRef} className="fixed inset-0 h-full flex-center flex-col bg-black bg-opacity-60 backdrop-blur-sm z-50">
            <div className="flex p-2 flex-col gap-3">
                <button className="self-end text-lg sm:text-xl bg-gray-600 hover:bg-gray-700 p-1 text-white border-2 border-gray-400 rounded-full transition-all duration-300 hover:scale-90 focus:scale-75" onClick={onClose}>
                    <RxCross1 />
                </button>
                <div className=" w-full flex flex-col gap-3 p-5  max-w-md bg-black border border-slate-500 rounded-xl">
                    <h2 className='text-xl sm:text-2xl font-semibold text-gray-100'>Items already in cart</h2>
                    <p className='text-sm sm:text-base font-light text-gray-300'>
                        Your cart contains items from other restaurant. Would you
                        like to reset your cart for adding items from this
                        restaurant?
                    </p>
                    <button onClick={startFresh} className="p-2 md:p-3 bg-slate-900 hover:bg-slate-950 text-white rounded-lg shadow-lg text-base md:text-lg border border-gray-400" >
                        Yes, Start Fresh
                    </button>
                    <button className="flex-center gap-2 p-2 md:p-3  bg-slate-900 hover:bg-slate-950 text-white rounded-lg shadow-lg text-base md:text-lg border border-gray-400 " onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RestFreshPopup