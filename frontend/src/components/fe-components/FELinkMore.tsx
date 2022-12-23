import { Group, useMantineTheme } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FEDoubleArrowOutline } from "src/assets/Icons/Fluent";

export interface IFELinkMore {
  to?: string;
  caption?: string;
  color?: string;
  onClick?: (()=>void);
}

const FELinkMore: React.FC<IFELinkMore> = ({
  to = "#",
  caption = "Selengkapnya",
  color = "rgb(95 90 247)",
  onClick
}) => {
  const navigate= useNavigate()
  return (
    <Group
      className="relative w-fit pr-6 cursor-pointer"
      color={color}
      style={{
        color: color,
      }}

      onClick={(to=="#")? onClick : ()=>{
        navigate(to)
      }}
    >
      {caption}
      <FEDoubleArrowOutline
        size={11}
        color={color}
        className="inline ml-2 absolute top-[5px] right-2"
      />
    </Group>
  );
};
export default FELinkMore;
