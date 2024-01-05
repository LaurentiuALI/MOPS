import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CoffeeCard from "./CoffeeCard";

describe("it should make sure Coffee Card is working", () => {
  it("should render properly", () => {
    render(<CoffeeCard coffeeName="test coffee" price={2} rating={5} />);

    const img = screen.getByAltText(/cappuccino/i);
    expect(img).toBeInTheDocument();

    const name = screen.getByText(/test coffee/i);
    expect(name).toBeInTheDocument();

    const price = screen.getByText("$2.00");
    expect(price).toBeInTheDocument();

    const rating = screen.getByText("5.0");
    expect(rating).toBeInTheDocument();
  });
});
