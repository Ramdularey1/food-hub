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

  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  const showSetLocationMenu = () => {
    setOpenLocationMenu(!openLocationMenu);
  }
  const handleMobileNavbar = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#080b12]/95 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-24">
      <div className="flex items-center gap-4">
        <Link to={"/"} className="flex items-center gap-3">
          <img className="size-12 sm:size-14" src="/assets/logo.svg" alt="Food Hub logo" />
          <span className="hidden text-xl font-bold text-white sm:block">Food Hub</span>
        </Link>
        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-white transition hover:border-orange-400/60 hover:bg-white/[0.09]">
          <div className="flex items-center gap-2 text-xs font-semibold sm:text-sm"><FaLocationDot className="text-orange-500" /><span>{userLocation?.city || "Delhi"}</span></div>
          <div className="flex-center">
            <button className="text-slate-300 hover:text-white" onClick={showSetLocationMenu}>
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
      <ul className="hidden items-center gap-2 lg:flex">
        {
          navLinks.map(({ id, Icon, path, text }) => {
            if (path === "/sign-in" && currentUser) {
              return (
                <div key={id} className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-white">
                    <Icon className="text-xl" />
                    {currentUser.name.split(" ")[0]}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      window.location.href = "/sign-in"; // reload cleanly
                    }}
                    className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-700"
                  >
                    Logout
                  </button>
                </div>
              );
            }
            return <Navlink onClose={() => { setIsNavMenuOpen(false) }} key={id} Icon={Icon} pathname={pathname} path={path} text={text} />;
          })
        }
      </ul>

      {/* for width <= 1024px */}
      <div className="lg:hidden">
        <button
          className="rounded-lg border border-white/10 bg-white/[0.06] p-2 text-2xl text-white transition hover:bg-white/[0.1] sm:text-3xl"
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
