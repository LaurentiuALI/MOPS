import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach } from "vitest";
import Chip from "./Chip";

afterEach(cleanup);

describe("it should make sure Chip is working", () => {
  it("should render properly", () => {
    render(<Chip> test chip </Chip>);
    const testChip = screen.getByText(/test chip/i);
    expect(testChip).toBeInTheDocument();
  });

  it("should be selectable", () => {
    render(<Chip> unselected </Chip>);
    const testUnselected = screen.getByText(/unselected/i);
    expect(testUnselected).toHaveClass("text-brand-dark");

    render(<Chip selected={true}> selected </Chip>);
    const testSelected = screen.getByText("selected");
    expect(testSelected).toHaveClass("text-brand-light");

    fireEvent.click(testSelected);
  });
});
