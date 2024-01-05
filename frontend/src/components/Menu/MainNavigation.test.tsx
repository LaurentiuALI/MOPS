import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import MainNavigation from "./MainNavigation";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

describe("it should make sure Menu is working", () => {
  it("should render properly", () => {
    render(
      <BrowserRouter>
        <MainNavigation isOpen={true} setIsOpen={() => {}} />
      </BrowserRouter>
    );

    const home = screen.getByText(/home/i);
    expect(home).toBeInTheDocument();
    fireEvent.click(home);

    const search = screen.getByText(/search/i);
    expect(search).toBeInTheDocument();
    fireEvent.click(search);

    const lucky = screen.getByText(/lucky/i);
    expect(lucky).toBeInTheDocument();
    fireEvent.click(lucky);

    const profile = screen.getByText(/profile/i);
    expect(profile).toBeInTheDocument();
    fireEvent.click(profile);

    const list = screen.getAllByRole("listitem");
    list.forEach((item) => {
      fireEvent.click(item);
    });
  });
});
