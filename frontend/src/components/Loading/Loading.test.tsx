import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loading from "./Loading";

describe("it should make sure Loading is working", () => {
  it("should render properly", () => {
    render(<Loading />);

    const img = screen.getByAltText(/loading/i);
    expect(img).toBeInTheDocument();
  });
});
