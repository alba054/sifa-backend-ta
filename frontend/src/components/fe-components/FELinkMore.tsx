import { useMantineTheme } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { FEDoubleArrowOutline } from "src/assets/Icons/Fluent";

export interface IFELinkMore {
  to?: string;
  caption?: string;
  color?: string;
}

const FELinkMore: React.FC<IFELinkMore> = ({
  to = "#",
  caption = "Selengkapnya",
  color = "rgb(95 90 247)",
}) => {
  return (
    <Link
      to={to || "#"}
      className="relative w-fit pr-6"
      color={color}
      style={{
        color: color,
      }}
    >
      {caption}
      <FEDoubleArrowOutline
        size={11}
        color={color}
        className="inline ml-2 absolute top-[5px]"
      />
    </Link>
  );
};
export default FELinkMore;
