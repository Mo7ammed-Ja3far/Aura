import React from "react";

function Title({ title, paragraph }) {
  return (
    <div className="title mt-[120px] text-center max-w-[573px] mx-auto">
      <h2 className="text-[40px] text-[#1F2937] font-medium">{title}</h2>
      <p className="text-[18px] block text-[#4B5563] leading-[27px] mt-4">
        {paragraph}
      </p>
    </div>
  );
}

export default Title;
