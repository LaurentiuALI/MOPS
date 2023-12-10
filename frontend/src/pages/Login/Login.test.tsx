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
});
