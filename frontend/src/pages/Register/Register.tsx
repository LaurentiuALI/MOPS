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

    navigate("/");
  }

  return (
    <>
      <header className="content-small register-header">
        <Logo />
      </header>
      <main className="register-container">
        <h1>Register</h1>
        <form>
          <Input
            className={`${email != "" ? "not-empty" : "empty"} ${
              status.state == "failure" ? "error" : ""
            }`}
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
          <Input
            className={`${password != "" ? "not-empty" : "empty"} ${
              status.state == "failure" ? "error" : ""
            }`}
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <Input
            className={`${repeatPassword != "" ? "not-empty" : "empty"} ${
              status.state == "failure" ? "error" : ""
            }`}
            label="Repear your password"
            id="repeat-password"
            type="password"
            placeholder="Repeat your password"
            value={repeatPassword}
            onChange={updateRepeatPassword}
          />
          {status.state === "failure" ? (
            <p className="error">{status.errorMessage}</p>
          ) : null}
          <ButtonPrimary onClick={registerSubmitHandle}>
            {status.state === "pending" ? <Loading /> : "Register"}
          </ButtonPrimary>
        </form>

        <ButtonSecondary
          fullwidth
          icon={iconGoogleObject}
          onClick={() => {
            //! TODO: Add social register functionality
          }}
        >
          Signup using Google
        </ButtonSecondary>
        <ButtonTertiary
          fullwidth
          onClick={() => {
            navigate("/login");
          }}
        >
          Already have an account? Log in
        </ButtonTertiary>
      </main>
      <aside className="register">
        <ButtonTertiary
          className="s-align-end btn-skip"
          onClick={() => navigate("/")}
        >
          Skip
        </ButtonTertiary>
      </aside>
    </>
  );
}
