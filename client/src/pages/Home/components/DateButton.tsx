// src/pages/Home/DateButton.tsx
type Props = {
  label: string;
  onClick: () => void;
};

const DateButton = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-400 text-black px-6 py-2 rounded hover:bg-gray-500 transition"
    >
      {label}
    </button>
  );
};

export default DateButton;
