import Logo from "../../components/Logo/Logo";
import Input from "./Input/Input";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ButtonTertiary from "../../components/Buttons/ButtonTertiary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";

import { type ILoginValues } from "./Types";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup/src/yup.js";
import * as yup from "yup";
import toast from "react-simple-toasts";
import axios from "axios";

const schema = yup.object({
  Username: yup.string().required("Username is required"),
  Password: yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, formState, control, handleSubmit } = useForm<ILoginValues>({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;
  const onSubmit = (data: ILoginValues) => {
    axios
      .post(`http://localhost:8081/api/users/login`, data)
      .then((res) => {
        toast("Logged in succesfully!", {
          className: "bg-green-500 p-2 opacity-75 text-white",
        });
        navigate("/");
        return res.data;
      })
      .catch((error) => {
        toast("Something went wrong!", {
          className: "bg-brand-red p-2 opacity-75 text-white",
        });
        console.log(error);
      });
  };

  const onClick = () => {
    if (errors.Password?.message != null) {
      toast(errors.Password?.message, {
        className: "bg-brand-red p-2 opacity-75 text-white",
        clickClosable: true,
        maxVisibleToasts: 2,
      });
    }

    if (errors.Username?.message != null) {
      toast(errors.Username?.message, {
        className: "bg-brand-red p-2 opacity-75 text-white",
        clickClosable: true,
        maxVisibleToasts: 2,
      });
    }
  };

  return (
    <div className="h-screen w-screen bg-brand-secondary font-sans">
      <header className="flex items-center justify-center p-4">
        <Logo />
      </header>
      <main className="flex flex-col items-center">
        <h1 className="font-semibold text-5xl text-brand-main mt-8 mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            register={register}
            errors={errors.Username?.message}
            className="mb-6"
            label="Username"
            id="username"
            type="text"
            placeholder="Username"
          />
          <Input
            register={register}
            errors={errors.Password?.message}
            className="mb-6"
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
          />

          <ButtonTertiary className="mb-6" onClick={() => navigate("/404")}>
            Forgot password?
          </ButtonTertiary>
          <ButtonPrimary className="mb-6" onClick={onClick}>
            Login
          </ButtonPrimary>
          <DevTool control={control} />
        </form>
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
