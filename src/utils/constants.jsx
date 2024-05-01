import { FaUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import { SlSupport } from "react-icons/sl";

export const navLinks  = [
    { id : 1, Icon: IoIosSearch,  path : "/search", text : "Search"},
    { id : 2, Icon: SlSupport,  path : "/support", text : "Support"},
    { id : 3, Icon: FaUserCircle,  path : "/sign-in", text : "Sign In", altText : "Log out"},
    { id : 4, Icon: MdShoppingCart,  path : "/checkout", text : "Cart"},
];
  
export const IMG_URL =
"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const IMG_SMALL_URL =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,e_color,c_fill/";


export const FETCH_REST_URL =
	"https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?"; 


	
export const FETCH_MENU_URL =
	"https://proxy.cors.sh/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&";
export const OFFER_LOGO_URL =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_20,h_20/";
export const IMG_INFO_URL =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export const FETCH_INFO_URL =
	"https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?";

export const FETCH_SEARCH_URL =
	"https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/search/suggest?";

export const IMG_SEARCH_URL =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/";
	

	

export const FETCH_PRE_SEARCH_URL =
	"https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/search/suggest?lat=26.87560&lng=80.91150&str=Hello&trackingId=undefined";
export const IMG_PRE_SEARCH_URL =
	"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/";
export const IMG_NOT_FOUND_URL =
	"https://img.freepik.com/free-vector/choose-concept-illustration_114360-5566.jpg?w=740&t=st=1707694077~exp=1707694677~hmac=ab7ce4acf3858d5cf92e4b66a8c76536ab12b88adb63348db868564e5e48773d";
export const IMG_ERROR_URL =
	"https://img.freepik.com/free-vector/monster-404-error-concept-illustration_114360-1879.jpg?w=740&t=st=1707696379~exp=1707696979~hmac=73ecf431946a3e0143bae8b9710484cb87d7dcea47a51dce9bd3d87eadeb2a6c";
export const IMG_NOT_FOUND_SEARCH_URL =
	"https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?w=740&t=st=1707770818~exp=1707771418~hmac=2f659884f97f78536f73ce53b1bebb2ccf9483660854e7faaff54325df335e0b";
export const IMG_OFFLINE_URL =
	"https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg?w=996&t=st=1708003009~exp=1708003609~hmac=8b4e90b44aefae9daad9978641551edb0d718cd9c5fc67de77f6874a37907a80";
export const IMG_RESTAURANT_NOT_URL =
	"https://img.freepik.com/free-vector/yes-no-concept-illustration_114360-7714.jpg?w=740&t=st=1707999100~exp=1707999700~hmac=4b3929e1b820dd1850b67521bfc4b4816ca39823bf64e02e042a68d665b12749";


	export const swiggyFaqs = [
		{
		  question: "How do I place an order on Hunger Hero ?",
		  answer: (
			<>
			  1. Go to the Hunger Hero website.
			  <br />
			  2. Browse restaurants and choose your desired items.
			  <br />
			  3. Add them to your cart and proceed to checkout.
			  <br />
			  4. Enter your delivery address and choose a payment method.
			  <br />
			  5. Place your order and track its progress in real-time.
			</>
		  ),
		},
		{
		  question: "What are the delivery charges on Hunger Hero ?",
		  answer:
			"Delivery charges on Hunger Hero  vary depending on the restaurant, distance, and order value. You can see the estimated delivery charge before placing your order.",
		},
		{
		  question: "What are the payment options available on Hunger Hero ?",
		  answer:
			"Hunger Hero  accepts various payment methods, including cash on delivery, credit/debit cards, UPI, and online wallets.",
		},
		{
		  question: "How can I track my order on Hunger Hero ?",
		  answer:
			"You can track your order in real-time through the Hunger Hero website. You will receive notifications about the order's progress.",
		},
	  ];