import { useNavigate } from "react-router-dom";

function MainNavigation() {
    const navigate = useNavigate();

    return <nav>
        <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/coffeeshops")}>Search</li>
            <li onClick={() => navigate("/wheel")}>Lucky Wheel</li>
            <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
    </nav>
}

export default MainNavigation;