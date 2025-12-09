"use client";
type Props = {
  changeStyle: string;
  onClick: () => void;
};
export const GenerateButton = ({ changeStyle, onClick }: Props) => {
  return (
    <div className="flex justify-end">
      <button
        className={`flex justify-center items-center w-[94px] h-10 cursor-pointer text-white font-medium text-[14px] rounded-lg ${changeStyle}`}
        onClick={onClick}
      >
        Generate
      </button>
    </div>
  );
};
