import { RequestStatus } from "../../../types/RequestStatus";
import IconGoogle from "../../assets/icons/icon_google.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import Loading from "../../components/Loading/Loading";
import ButtonTertiary from "../../components/Buttons/ButtonTertiary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";

const iconGoogleObject = {
  src: IconGoogle,
  title: "Google Logo",
  altText: "Google Logo",
};

export default function Register() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<RequestStatus>({ state: "idle" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatpassword] = useState<string>("");

  function updateEmail(newValue: string) {
    if (status.state == "failure") setStatus({ state: "idle" });
    setEmail(newValue);
  }
  function updatePassword(newValue: string) {
    if (status.state == "failure") setStatus({ state: "idle" });
    setPassword(newValue);
  }
  function updateRepeatPassword(newValue: string) {
    if (status.state == "failure") setStatus({ state: "idle" });
    setRepeatpassword(newValue);
  }

  async function registerSubmitHandle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setStatus({ state: "pending" });
    const timeout = setTimeout(() => {
      navigate("/");
      clearTimeout(timeout);
    }, 1000);
    
  }

  return (
    <div className="h-screen w-screen bg-brand-secondary font-sans">
      <header className="flex items-center justify-center p-4">
        <Logo />
      </header>
      <main className="flex flex-col items-center">
        <h1 className="font-semibold text-5xl text-brand-main mt-8 mb-6">
          Register
          </h1>
        <form>
          <Input
            className="mb-6"
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
          <Input
            className="mb-6"
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <Input
            className="mb-6"
            label="Repear password"
            id="repeat-password"
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={updateRepeatPassword}
          />

          <ButtonPrimary className="mb-6" onClick={registerSubmitHandle}>
            {status.state === "pending" ? <Loading /> : "Register"}
          </ButtonPrimary>
        </form>

        <ButtonSecondary
          className="mb-6"
          fullwidth
          icon={iconGoogleObject}
          onClick={() => {
            //! TODO: Add social register functionality
          }}
        >
          Sign up using Google
        </ButtonSecondary>

        <ButtonSecondary onClick={() => navigate("/login")}>
          Login
        </ButtonSecondary>
      </main>
      <aside className="flex justify-center mt-8 ml-32 text-lg font-semibold text-brand-main">
        <ButtonTertiary
          className="s-align-end btn-skip"
          onClick={() => navigate("/")}
        >
          Continue as guest
        </ButtonTertiary>
      </aside>
    </div>
  );
}
