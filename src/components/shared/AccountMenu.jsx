import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AccountMenu = ({ currentUser, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsOpen(false);
    if (onClose) onClose();
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 text-base font-semibold delay-100 transition-all text-white hover:bg-gray-800 py-1 px-2 rounded-lg"
      >
        <FaUserCircle className="text-xl" />
        {currentUser.name.split(" ")[0] || "Account"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg py-2 z-[60] border dark:border-slate-700">
          <div className="px-4 py-3 border-b dark:border-slate-700">
            <p className="text-sm text-gray-900 dark:text-white font-medium">{currentUser.name}</p>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 truncate">
              {currentUser.email}
            </p>
          </div>
          <div className="px-4 py-2">
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default AccountMenu;
