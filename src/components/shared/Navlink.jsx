import { Link } from "react-router-dom"
const Navlink = ({onClose, pathname, Icon, path, text}) => {

    return (
        <li >
            <Link onClick={() => { onClose() }} className={`flex-center  gap-1 text-base font-semibold delay-100 transition-all ${pathname === path ? "text-[#d74112] hover:text-orange-800 w-full" : "text-white hover:bg-gray-800 py-1 px-2 rounded-lg"}`} to={path}> <Icon className="text-xl">
                <span></span></Icon>{text}
            </Link>
        </li>
    )
}

export default Navlink