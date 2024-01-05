import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import ButtonTertiary from "./ButtonTertiary";
import icon from "../../assets/icons/icon_arrow.svg";
import { describe, expect, it, vi, afterEach } from "vitest";

afterEach(cleanup);

describe("it should make sure Primary Button is working", () => {
  it("should render properly", () => {
    render(<ButtonPrimary> test button </ButtonPrimary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    expect(testButton).toBeInTheDocument();
  });
  it("should respect design and have margin", () => {
    render(<ButtonPrimary className="mb-6"> test button </ButtonPrimary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    expect(testButton).toHaveClass("bg-brand-main mb-6");
  });
  it("should click 2 times", () => {
    const spy = vi.fn(() => {});
    render(<ButtonPrimary onClick={spy}> test button </ButtonPrimary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    fireEvent.click(testButton);
    fireEvent.click(testButton);
    expect(spy).toBeCalledTimes(2);
  });
});

describe("it should make sure Secondary Button is working", () => {
  it("should render properly", () => {
    render(<ButtonSecondary> test button </ButtonSecondary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    expect(testButton).toBeInTheDocument();
  });
  it("should respect design and have margin", () => {
    render(
      <ButtonSecondary
        icon={{ src: icon, title: icon, altText: "test" }}
        className="mb-6"
      >
        test button
      </ButtonSecondary>
    );
    const testButton = screen.getByRole("button", { name: /test button/i });
    expect(testButton).toHaveClass("bg-brand-secondary  mb-6");

    const img = screen.getByAltText("test");
    expect(img).toBeInTheDocument();
  });
  it("should click 2 times", () => {
    const spy = vi.fn(() => {});
    render(<ButtonSecondary onClick={spy}> test button </ButtonSecondary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    fireEvent.click(testButton);
    fireEvent.click(testButton);
    expect(spy).toBeCalledTimes(2);
  });
});

describe("it should make sure Tertiary Button is working", () => {
  it("should render properly", () => {
    render(<ButtonTertiary> test button </ButtonTertiary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    expect(testButton).toBeInTheDocument();
  });
  it("should respect design and have margin", () => {
    render(
      <ButtonTertiary
        icon={{ src: icon, title: icon, altText: "test" }}
        className="mb-6"
        fullwidth
      >
        test button
      </ButtonTertiary>
    );
    const testButton = screen.getByRole("button", { name: /test button/i });
    expect(testButton).toHaveClass("mb-6 full-width");

    const img = screen.getByAltText("test");
    expect(img).toBeInTheDocument();
  });
  it("should click 2 times", () => {
    const spy = vi.fn(() => {});
    render(<ButtonTertiary onClick={spy}> test button </ButtonTertiary>);
    const testButton = screen.getByRole("button", { name: /test button/i });
    fireEvent.click(testButton);
    fireEvent.click(testButton);
    expect(spy).toBeCalledTimes(2);
  });
});
