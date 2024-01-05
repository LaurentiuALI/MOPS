import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Search from "./Search";
import { BrowserRouter } from "react-router-dom";

describe("it should make sure Input is working", () => {
  it("should render properly", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const label = screen.getByLabelText(/search your next coffee/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("bg-brand-main");

    const input = screen.getByPlaceholderText(/what shall it be?/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type");
    expect(input).toHaveAttribute("value");
    expect(input).toHaveAttribute("id");

    expect(input).toHaveClass("bg-brand-main");

    fireEvent.change(input, { target: { value: "test" } });

    const backButton = screen.getByTestId(/back button/i);
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);

    const menuButton = screen.getByTestId(/menu button/i);
    expect(menuButton).toBeInTheDocument();
    fireEvent.click(menuButton);
  });
});
