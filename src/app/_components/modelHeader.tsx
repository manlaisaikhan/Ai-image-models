"use client";
import { RefreshIcon } from "../_icons/refreshIcon";
import { StarIcon } from "../_icons/starIcon";
type Props = {
  title: string;
};

export const ModelHeader = ({ title }: Props) => {
  return (
    <div className="w-full h-10 flex items-center justify-between">
      <p className="flex items-center gap-2">
        <StarIcon />
        <span className="text-[20px] font-semibold text-black">{title}</span>
      </p>
      <button className="w-12 h-10 flex items-center justify-center cursor-pointer rounded-[5px] border">
        <RefreshIcon />
      </button>
    </div>
  );
};
