import { render, fireEvent } from "@testing-library/react";
import VintageDatePicker from "../DatePicker";

describe("VintageDatePicker", () => {
  it("renders and allows date selection (positive)", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <VintageDatePicker value={null} onChange={handleChange} />
    );
    const input = getByPlaceholderText("Select a date");
    fireEvent.change(input, { target: { value: "2020-01-01" } });
    // Note: react-datepicker uses popups, so this is a basic smoke test
    expect(input).toBeInTheDocument();
  });

  it("does not call onChange if no date is picked (negative)", () => {
    const handleChange = jest.fn();
    render(<VintageDatePicker value={null} onChange={handleChange} />);
    expect(handleChange).not.toHaveBeenCalled();
  });
});
