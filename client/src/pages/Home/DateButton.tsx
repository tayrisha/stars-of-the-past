// src/pages/Home/DateButton.tsx
type Props = {
  label: string;
  onClick: () => void;
};

const DateButton = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      {label}
    </button>
  );
};

export default DateButton;
