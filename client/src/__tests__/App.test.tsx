import { render } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders without crashing (positive)", () => {
    // Only run a smoke test, skip if hooks error
    expect(() => render(<App />)).not.toThrow();
  });
});
