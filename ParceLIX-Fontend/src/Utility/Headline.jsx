import React from "react";

const Headline = ({
  title,
  subtitle,
  div,
  titleClass,
  subtitleClass,
  className,
}) => {
  return (
    <div className={className}>
      <div className={`text-3xl md:text-4xl mb-2 font-bold ${titleClass}`}>
        {title}
      </div>
      <div
        className={`absolute w-11 h-0.75 background-color -top-2 left-[47%] rounded-md  content-none`}
      >
        {div}
      </div>
      <div className={`mb-12  ${subtitleClass}`}>{subtitle}</div>
    </div>
  );
};

export default Headline;
