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

  it("renders with a selected date value (positive)", () => {
    const handleChange = jest.fn();
    const selectedDate = new Date(2020, 0, 1);
    const { getByDisplayValue } = render(
      <VintageDatePicker value={selectedDate} onChange={handleChange} />
    );
    
    // The date should be displayed in the input
    expect(getByDisplayValue("2020-01-01")).toBeInTheDocument();
  });

  it("does not call onChange if no date is picked (negative)", () => {
    const handleChange = jest.fn();
    render(<VintageDatePicker value={null} onChange={handleChange} />);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("opens calendar and applies day styling when focused (positive)", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText, container } = render(
      <VintageDatePicker value={null} onChange={handleChange} />
    );
    
    const input = getByPlaceholderText("Select a date");
    
    // Focus to open the calendar (this will trigger dayClassName function)
    fireEvent.focus(input);
    
    // Verify the calendar opens and day elements have the expected styling
    const dayElements = container.querySelectorAll('.react-datepicker__day');
    expect(dayElements.length).toBeGreaterThan(0);
    
    // Check if day elements have the custom styling from dayClassName
    const firstDay = dayElements[0];
    expect(firstDay).toHaveClass('text-xl', 'hover:bg-gray-300', 'rounded-full', 'transition', 'duration-200', 'ease-in-out');
  });
});
