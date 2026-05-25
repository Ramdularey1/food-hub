import { useRef } from 'react';
import { navLinks } from '../../utils/constants';
import Navlink from './Navlink';
import { RxCross1 } from 'react-icons/rx';

const MobileNavLink = ({pathname, onClose}) => {
  const menuRef = useRef(null);
  const currentUserStr = localStorage.getItem("currentUser");
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

  const handleShowMenu = (e) => {
    if (e.target === menuRef.current) {
      onClose();
    }
  }
  
  return (
    <div onClick={handleShowMenu} ref={menuRef} className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-sm lg:hidden">
      <div className="mr-4 mt-4 flex w-full max-w-xs flex-col rounded-lg border border-white/10 bg-[#101522] p-5 text-base font-semibold text-slate-200 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="size-10" src="/assets/logo.svg" alt="Food Hub logo" />
            <span className="font-bold text-white">Food Hub</span>
          </div>
        <button
          onClick={onClose}
          type="button"
          className="rounded-lg p-2 text-2xl text-slate-300 transition hover:bg-white/10 hover:text-white"
          tabIndex={0}
        >
          <span className="sr-only">Close navigation</span>
          <RxCross1 />
        </button>
        </div>
        <ul className="my-2 flex w-full flex-col items-stretch gap-2">
        {
          navLinks.map(({id, Icon, path, text}) => {
            if (path === "/sign-in" && currentUser) {
              return (
                <div key={id} className="flex w-full flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex items-center gap-2 text-base font-semibold text-white">
                    <Icon className="text-xl" />
                    Hi, {currentUser.name.split(" ")[0]}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      window.location.href = "/sign-in";
                    }}
                    className="rounded-lg bg-orange-600 px-3 py-2 text-left font-bold text-white transition hover:bg-orange-700"
                  >
                    Logout
                  </button>
                </div>
              );
            }
            return <Navlink onClose={onClose} key={id} Icon={Icon} pathname={pathname} path={path} text={text}/>
          })
        }
        </ul>
      </div>
    </div>
  )
}

export default MobileNavLink
