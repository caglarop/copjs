'use client';

type Props = {
  children?: React.ReactNode;
};

export default function HorizontalDivider({ children }: Props) {
  return (
    <>
      <div className="relative my-6 flex items-center justify-center">
        <div>
          <div className="bg-gray/25 h-[2px] w-[50px]"></div>
        </div>
        <span className="text-gray font-regular mx-4 text-center dark:text-gray-300">
          {children}
        </span>
        <div>
          <div className="bg-gray/25 h-[2px] w-[50px]"></div>
        </div>
      </div>
    </>
  );
}
