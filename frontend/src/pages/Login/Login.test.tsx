import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { expect, it, describe, afterEach } from "vitest";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

describe("it should test basic behaviour", () => {
  it("should render properly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginHeader = screen.getByRole("heading");
    expect(loginHeader.textContent).toBe("Login");

    const usernameLabel = screen.getByLabelText(/username/i);
    expect(usernameLabel).toBeInTheDocument();

    const passwordLabel = screen.getByLabelText("Password");
    expect(passwordLabel).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();

    const guestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    expect(guestButton).toBeInTheDocument();

    const forgotPass = screen.getByRole("button", { name: /forgot password/i });
    expect(forgotPass).toBeInTheDocument();

    fireEvent.click(loginButton);
    fireEvent.click(registerButton);
    fireEvent.click(guestButton);
    fireEvent.click(forgotPass);
  });

  it("should error when empty", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    fireEvent.click(loginButton);

    setTimeout(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    }, 2000);
  });

  it("should try to login", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const username = screen.getByPlaceholderText(/username/i);
    expect(username).toBeInTheDocument();

    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();

    fireEvent.change(username, { target: { value: "abcd" } });
    fireEvent.change(password, { target: { value: "abcdef" } });

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    fireEvent.submit(loginButton);
  });
});
