import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../routes/AppRouter";

describe("AppRouter", () => {
  it("renders Home route (positive)", () => {
    // Only check that it renders without error
    expect(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      );
    }).not.toThrow();
  });

  it("renders Gallery route (positive)", () => {
    expect(() => {
      render(
        <MemoryRouter initialEntries={["/gallery"]}>
          <AppRouter />
        </MemoryRouter>
      );
    }).not.toThrow();
  });
});
