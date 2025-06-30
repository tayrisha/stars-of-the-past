import { render, fireEvent } from "@testing-library/react";
import DateButton from "../DateButton";

describe("DateButton", () => {
  it("renders with label and handles click (positive)", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <DateButton label="Pick Date" onClick={onClick} />
    );
    const button = getByText("Pick Date");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call onClick if not clicked (negative)", () => {
    const onClick = jest.fn();
    render(<DateButton label="Pick Date" onClick={onClick} />);
    expect(onClick).not.toHaveBeenCalled();
  });
});
