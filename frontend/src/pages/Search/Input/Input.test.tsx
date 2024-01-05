import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Input from "./Input";

describe("it should make sure Input is working", () => {
  it("should render properly", () => {
    render(
      <Input
        className="m-[16px] flex gap-[8px]"
        label="Search your next coffee"
        id="search-coffee"
        type="password"
        value=""
        onChange={() => {}}
        placeholder="What shall it be?"
      />
    );

    const label = screen.getByLabelText(/search your next coffee/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("bg-brand-secondary");

    const input = screen.getByPlaceholderText(/what shall it be?/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type");
    expect(input).toHaveAttribute("value");
    expect(input).toHaveAttribute("id");

    expect(input).toHaveClass("border-2");

    const img = screen.getByAltText(/password/i);
    expect(img).toBeInTheDocument();

    fireEvent.click(img);
    fireEvent.click(img);
    fireEvent.change(input, { target: { value: "test" } });
  });
});
