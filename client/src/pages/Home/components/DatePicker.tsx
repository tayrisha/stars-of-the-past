import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const VintageDatePicker = ({ value, onChange }: Props) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        minDate={new Date(1995, 5, 16)}
        className="w-full px-4 py-2 rounded border border-black text-black placeholder-black font-serif text-lg bg-[#C0C0C0] shadow-inner focus:outline-none focus:border-black focus:bg-[#C0C0C0] focus:text-black focus:ring-0"
        calendarClassName="
          !bg-[#C0C0C0]   
          !text-black   
          font-serif
          rounded-lg
          shadow-lg
          p-2
          text-lg
        "
        dayClassName={() =>
          "text-xl hover:bg-gray-300 rounded-full transition duration-200 ease-in-out"
        }
        popperPlacement="bottom"
      />
    </div>
  );
};

export default VintageDatePicker;
