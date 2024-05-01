import { useRef } from 'react';
import { navLinks } from '../../utils/constants';
import Navlink from './Navlink';
import { RxCross1 } from 'react-icons/rx';


const MobileNavLink = ({pathname, onClose}) => {
  const menuRef = useRef(null);
  const handleShowMenu = (e) => {
    if (e.target === menuRef.current) {
      onClose();
    }
  }
  
  return (
    <div onClick={handleShowMenu} ref={menuRef} className="lg:hidden fixed inset-0 flex justify-end items-start bg-black bg-opacity-30 backdrop-blur-sm z-50">
      <div className=" w-full max-w-xs mt-4 mr-4 bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5 flex flex-col">
        <button
          onClick={onClose}
          type="button"
          className=" self-end text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 text-2xl sm:text-3xl"
          tabIndex={0}
        >
          <span className="sr-only">Close navigation</span>
          <RxCross1 />
        </button>
        <ul className="space-y-7 my-2 flex flex-col items-start">
        {
          navLinks.map(({id, Icon, path, text}) => (
            <Navlink onClose={onClose} key={id} Icon={Icon} pathname={pathname} path={path} text={text}/>
          ))
        }
        </ul>
      </div>
    </div>
  )
}

export default MobileNavLink