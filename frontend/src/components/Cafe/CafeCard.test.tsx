import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import CafeCard from "./CafeCard";
import { describe, expect, it, afterEach } from "vitest";
import favoriteIcon from "../../assets/icons/icon_heart_favorite.svg";
import notFavoriteIcon from "../../assets/icons/icon_heart_not_favorite.svg";

afterEach(cleanup);

describe("it should make sure Cafe Card is working", () => {
  it("should render properly", () => {
    const cafeImage = { src: "test", title: "test", alt: "test" };

    render(
      <CafeCard
        cafeImage={cafeImage}
        cafeName="name test"
        distance={2}
        rating={5}
        isFavorite={false}
        onClick={() => {}}
      />
    );
    const favorite = screen.getByAltText("favorite");
    expect(favorite).toBeInTheDocument();

    const cafe = screen.getByAltText("test");
    expect(cafe).toBeInTheDocument();

    const name = screen.getByText(/name test/i);
    expect(name).toBeInTheDocument();

    const distance = screen.getByText(/2/i);
    expect(distance).toBeInTheDocument();

    const rating = screen.getByText(/5/i);
    expect(rating).toBeInTheDocument();
  });

  it("should be able to add favorite", () => {
    const cafeImage = { src: "test", title: "test", alt: "test" };

    render(
      <CafeCard
        cafeImage={cafeImage}
        cafeName="name test"
        distance={2}
        rating={5}
        isFavorite={false}
        onClick={() => {}}
      />
    );

    const favorite = screen.getByAltText("favorite");
    expect(favorite).toHaveAttribute("src", notFavoriteIcon);

    fireEvent.click(favorite);

    expect(favorite).toHaveAttribute("src", favoriteIcon);
  });
});
