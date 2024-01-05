import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { expect, it, describe, afterEach } from "vitest";
import Register from "./Register";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

describe("it should test basic behaviour", () => {
  it("should render properly", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const registerHeader = screen.getByRole("heading");
    expect(registerHeader.textContent).toBe("Register");

    const usernameLabel = screen.getByLabelText(/username/i);
    expect(usernameLabel).toBeInTheDocument();

    const emailLabel = screen.getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();

    const nicknameLabel = screen.getByLabelText(/nickname/i);
    expect(nicknameLabel).toBeInTheDocument();

    const passwordLabel = screen.getByLabelText("Password");
    expect(passwordLabel).toBeInTheDocument();

    const repeatPasswordLabel = screen.getByLabelText(/repeat password/i);
    expect(repeatPasswordLabel).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const guestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    expect(guestButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    fireEvent.submit(registerButton);
    fireEvent.click(guestButton);
  });

  it("should error when empty", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();

    fireEvent.click(registerButton);
    fireEvent.click(registerButton);
    setTimeout(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(
        screen.getByText("Repeat Password is required")
      ).toBeInTheDocument();
      expect(screen.getByText("Email format is not valid")).toBeInTheDocument();
    }, 2000);
  });

  it("should register", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const usernameLabel = screen.getByLabelText(/username/i);
    expect(usernameLabel).toBeInTheDocument();

    const emailLabel = screen.getByLabelText(/email/i);
    expect(emailLabel).toBeInTheDocument();

    const nicknameLabel = screen.getByLabelText(/nickname/i);
    expect(nicknameLabel).toBeInTheDocument();

    const passwordLabel = screen.getByLabelText("Password");
    expect(passwordLabel).toBeInTheDocument();

    const repeatPasswordLabel = screen.getByLabelText(/repeat password/i);
    expect(repeatPasswordLabel).toBeInTheDocument();

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();

    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const guestButton = screen.getByRole("button", {
      name: /continue as guest/i,
    });
    expect(guestButton).toBeInTheDocument();
  });
});
