import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Logo from "./Logo";
import { BrowserRouter } from "react-router-dom";

describe("it should make sure Loading is working", () => {
  it("should render properly", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    const img = screen.getByAltText(/find coffee/i);
    expect(img).toBeInTheDocument();

    fireEvent.click(img);
  });
});
