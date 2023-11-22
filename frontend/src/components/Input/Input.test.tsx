import { describe, expect, it } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import Input from "./Input";
import { useState } from "react";

describe("Input", () => {
  it("should render input", () => {
    const [email, setEmail] = useState<string>("");
    <Input
      className="mb-6"
      label="Email"
      id="email"
      type="email"
      placeholder="Email"
      value={email}
      onChange={() => setEmail(email)}
    />;

    const inputElement = screen;
  });
});
