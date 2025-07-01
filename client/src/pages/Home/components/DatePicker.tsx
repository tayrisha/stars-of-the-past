import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  value: Date | null;
  onChange: (date: Date | null) => void;
};

const VintageDatePicker = ({ value, onChange }: Props) => {
  
  const years = Array.from(
    { length: new Date().getFullYear() - 1995 + 1 },
    (_, i) => 1995 + i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
        minDate={new Date(1995, 5, 16)}
        maxDate={new Date()}
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
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className="flex justify-center gap-2 mb-2">
            <select
              value={date.getFullYear()}
              onChange={(e) => changeYear(Number(e.target.value))}
              className="bg-[#C0C0C0] text-black rounded px-2 py-1"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={date.getMonth()}
              onChange={(e) => changeMonth(Number(e.target.value))}
              className="bg-[#C0C0C0] text-black rounded px-2 py-1"
            >
              {months.map((month, idx) => (
                <option key={month} value={idx}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default VintageDatePicker;
