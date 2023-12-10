import { useState } from "react";
import type { RequestStatus } from "../../../types/RequestStatus";
import IconGoogle from "../../assets/icons/icon_google.svg";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ButtonTertiary from "../../components/Buttons/ButtonTertiary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import React from "react";

const iconGoogleObject = {
  src: IconGoogle,
  title: "Google Logo",
  altText: "Google Logo",
};

export default function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<RequestStatus>({ state: "idle" });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function updateEmail(newValue: string) {
    if (status.state == "failure") setStatus({ state: "idle" });
    setEmail(newValue);
  }
  function updatePassword(newValue: string) {
    if (status.state == "failure") setStatus({ state: "idle" });
    setPassword(newValue);
  }

  async function loginSubmitHandle(e: React.MouseEvent<HTMLButtonElement>) {
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
          Login
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
          <ButtonTertiary className="mb-6" onClick={() => navigate("/404")}>
            Forgot password?
          </ButtonTertiary>
          <ButtonPrimary className="mb-6" onClick={loginSubmitHandle}>
            {status.state === "pending" ? <Loading /> : "Login"}
          </ButtonPrimary>
        </form>
        <ButtonSecondary
          className="mb-6"
          icon={iconGoogleObject}
          onClick={() => {
            //! TODO: Add social login functionality
          }}
        >
          Login using Google
        </ButtonSecondary>

        <ButtonSecondary
          fullwidth
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </ButtonSecondary>
      </main>
      <aside className="flex justify-center mt-16 ml-32 text-lg font-semibold text-brand-main">
        <ButtonTertiary className="" onClick={() => navigate("/")}>
          Continue as guest
        </ButtonTertiary>
      </aside>
    </div>
  );
}
