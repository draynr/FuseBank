import React from "react";

const TopSection = ({
  type,
  title,
  user_name,
  subtext,
}: TopSectionProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}{" "}
        {type === "base" && (
          <span>{user_name}</span>
        )}
      </h1>
      <p className="header-box-subtext">
        {subtext}
      </p>
    </div>
  );
};

export default TopSection;
