import { useNavigate } from "react-router-dom";

import toast from "react-simple-toasts";

import Logo from "../../components/Logo/Logo";
import Input from "../../components/Input/Input";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ButtonTertiary from "../../components/Buttons/ButtonTertiary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";

import { IRegisterRequest, type IFormValues } from "./Types";

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object({
  Username: yup
    .string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters long."),
  Email: yup
    .string()
    .email("Email format is not valid")
    .matches(/@[^.]*\./, "Email format is not valid")
    .required("Email is required"),
  Password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters."),
  "Repeat password": yup
    .string()
    .required("Repeat Password is required")
    .oneOf([yup.ref("Password")], "Passwords do not match."),
});

export default function Register() {
  const navigate = useNavigate();

  const { register, control, handleSubmit, formState } = useForm<IFormValues>({
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const onSubmit = (data: IFormValues) => {
    const user: IRegisterRequest = { ...data, Role: "User" };
    delete user["Repeat password"];

    axios
      .post(`http://localhost:8081/api/users/register`, user)
      .then((res) => {
        navigate("/login");
        toast("Account created succesfully!", {
          className: "bg-green-500 p-2 opacity-75 text-white",
        });
        console.log(res.data);
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
        maxVisibleToasts: 3,
      });
    }

    if (errors["Repeat password"]?.message != null) {
      toast(errors["Repeat password"]?.message, {
        className: "bg-brand-red p-2 opacity-75 text-white",
        clickClosable: true,
        maxVisibleToasts: 3,
      });
    }
    if (errors.Email?.message != null) {
      toast(errors.Email?.message, {
        className: "bg-brand-red p-2 opacity-75 text-white",
        clickClosable: true,
        maxVisibleToasts: 3,
      });
    }
    if (errors.Username?.message != null) {
      toast(errors.Username?.message, {
        className: "bg-brand-red p-2 opacity-75 text-white",
        clickClosable: true,
        maxVisibleToasts: 3,
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
          Register
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
            errors={errors.Email?.message}
            className="mb-6"
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
          />

          <Input
            register={register}
            errors={errors.Nickname?.message}
            className="mb-6"
            label="Nickname"
            id="nickname"
            type="text"
            placeholder="Nickname ( optional )"
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
          <Input
            register={register}
            errors={errors["Repeat password"]?.message}
            className="mb-6"
            label="Repeat password"
            id="repeatPassword"
            type="password"
            placeholder="Repeat password"
          />
          <ButtonPrimary className="mb-6" onClick={onClick}>
            Register
          </ButtonPrimary>
        </form>
        <DevTool control={control} />

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
