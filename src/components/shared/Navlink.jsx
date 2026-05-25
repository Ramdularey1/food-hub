import { Link } from "react-router-dom"
const Navlink = ({onClose, pathname, Icon, path, text}) => {

    return (
        <li>
            <Link onClick={() => { onClose() }} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${pathname === path ? "bg-orange-500/15 text-orange-300" : "text-slate-200 hover:bg-white/[0.08] hover:text-white"}`} to={path}> <Icon className="text-xl">
                <span></span></Icon>{text}
            </Link>
        </li>
    )
}

export default Navlink
