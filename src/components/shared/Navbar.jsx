import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FaLocationDot } from "react-icons/fa6";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import DetectLocation from "./DetectLocation";
import MobileNavLink from "./MobileNavLink";
import { navLinks } from "../../utils/constants";
import Navlink from "./Navlink";


const Navbar = () => {
  const { pathname } = useLocation();
  const [openLocationMenu, setOpenLocationMenu] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const userLocation = useSelector((store) => store.userLocation);

  const showSetLocationMenu = () => {
    setOpenLocationMenu(!openLocationMenu);
  }
  const handleMobileNavbar = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  }

  return (
    <nav className="fixed  z-50 left-0 right-0 top-0   bg-black border-b shadow-md ">
      <div className="max-w-[1440px] flex-between lg:py-3 px-5 mx-auto">
        {/* for logo and the location */}
      <div className="flex-center gap-3">
        <Link to={"/"} className={`w-[48px] sm:w-14 `}><img src="/assets/logo.svg" alt="logo" /></Link>
        <div className={`flex-center gap-2 border p-1 rounded-md text-white border-gray-100 bg-black hover:bg-gray-900 delay-100 transition-all`}>
          <div className="flex-center gap-[1px] sm:gap-[2px] text-xs  sm:text-sm "><FaLocationDot className="text-red-700 text-base" /><span className=" text-white">{userLocation?.city || "Delhi"}</span></div>
          <div className="flex-center">
            <button onClick={showSetLocationMenu}>
              {openLocationMenu ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
            </button>
          </div>
        </div>
        {openLocationMenu &&
          <DetectLocation onClose={() => { showSetLocationMenu() }} />
        }
      </div>

      {/* for nav links eg. Offers, Cart and more */}

      {/* for width >= 1024px */}
      <ul className=" gap-4 hidden lg:flex-center">
        {
          navLinks.map(({ id, Icon, path, text }) => (
            <Navlink onClose={() => { setIsNavMenuOpen(false) }} key={id} Icon={Icon} pathname={pathname} path={path} text={text} />
          ))
        }
      </ul>

      {/* for width <= 1024px */}
      <div className="lg:hidden my-6">
        <button
          className={`flex-center transition-opacity duration-300 text-2xl sm:text-3xl`}
          onClick={handleMobileNavbar}
        >
          {isNavMenuOpen ? <RxCross1 className="text-white" /> : <RxHamburgerMenu className="text-white" />}
        </button>
        {isNavMenuOpen && <MobileNavLink pathname={pathname} onClose={() => { setIsNavMenuOpen(false) }} />}
      </div>
      </div>
    </nav>
  )
}

export default Navbar