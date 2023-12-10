import { useNavigate } from "react-router-dom";
import SVGClose from "../Icons/SVGClose";

interface MenuProps {
    isOpen:boolean,
    setIsOpen: () => void
}

function MainNavigation({ isOpen,setIsOpen }: MenuProps) {
    const navigate = useNavigate();

    return <dialog open={isOpen} className="z-10 p-[16px] bg-brand-main rounded-l-lg border-[1px] "
        style={{ right: "calc(-50vh + 150px)" }}
    >
        <nav className="bg-brand-main text-brand-secondary">
            <ul className="flex flex-col items-end gap-[12px] font-medium">
                <li onClick={() => setIsOpen()}><SVGClose title="close button" /></li>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/coffeeshops")}>Search</li>
                <li onClick={() => navigate("/wheel")}>Lucky Wheel</li>
                <li onClick={() => navigate("/profile")}>Profile</li>
            </ul>
        </nav>
    </dialog>
}

export default MainNavigation;