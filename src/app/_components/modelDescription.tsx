"use client";
type Props = {
  title: string;
};
export const ModelDescription = ({ title }: Props) => {
  return <p className="text-[14px] text-[#71717A] font-normal">{title}</p>;
};
