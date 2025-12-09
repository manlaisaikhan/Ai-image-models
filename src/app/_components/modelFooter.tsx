"use client";

type Props = {
  title: string;
  description: any;
  icon: React.ReactNode;
};
export const ModelFooter = ({ title, description, icon }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="flex items-center gap-2">
        {icon}
        <span className="text-[20px] font-semibold text-black">{title}</span>
      </p>
      <div className="w-full flex items-center min-h-10 rounded-lg border border-zinc-200 pl-3 pr-3 pt-2 pb-2 text-[14px] font-normal text-[#71717a]">
        {description}
      </div>
    </div>
  );
};
