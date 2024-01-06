import Input from "./Input/Input";
import SVGArrow from "../../components/Icons/SVGArrow";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-screen bg-brand-main pb-[16px] rounded-b-[8px] absolute z-10">
      <header className="flex justify-between pt-[16px] px-[16px] gap-[8px]">
        <SVGArrow
          title="Go back to the previous page"
          onClick={() => {
            if (location.pathname == "/") {
              navigate("/login")
              return;
            }

            navigate(-1);
          }}
        />
        <h1 className="text-brand-secondary text-[14px] font-normal leading-5 w-full">
          Start a new day with a cup of coffee.
        </h1>
        <div>
          <div
            className="bg-brand-light h-8 w-8 rounded-full"
            onClick={() => navigate("/profile")}
          />
        </div>
      </header>
      <Input
        className="m-[16px] flex gap-[8px]"
        label="Search your next coffee"
        id="search-coffee"
        type="text"
        onChange={() => {}}
        onClick={() => {
          navigate("/coffeeshops");
        }}
        placeholder="What shall it be?"
        labelClass="bg-brand-main text-brand-secondary"
        bgColor="bg-brand-main"
        isBgDark={true}
      />
    </div>
  );
};

export default Navbar;
