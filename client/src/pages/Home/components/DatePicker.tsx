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
        className="w-full px-4 py-2 rounded border border-yellow-900 text-yellow-900 font-serif text-lg bg-yellow-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-700"
        calendarClassName={`
          !bg-yellow-100 
          !border-yellow-800 
          !text-yellow-900 
          font-serif 
          rounded-lg 
          shadow-lg 
          p-2 
          text-lg 
        `}
        dayClassName={() =>
          "text-xl hover:bg-yellow-300 rounded-full transition duration-200 ease-in-out"
        }
        popperPlacement="bottom"
      />
    </div>
  );
};

export default VintageDatePicker;
