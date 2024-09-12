import React from "react";
type Props = {
  title: string;
};
const Title: React.FC<Props> = ({ title }) => {
  return (
    <h1 className="text-3xl tracking-widest shadow-sm p-4  text-font mb-4 mx-auto mt-0 text-left w-full  rounded border bg-[#F7F7F7]">
      {title}
    </h1>
  );
};

export default Title;
