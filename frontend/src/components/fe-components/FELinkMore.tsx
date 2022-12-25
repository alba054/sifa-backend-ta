import { Group } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FEDoubleArrowOutline } from "src/assets/Icons/Fluent";

export interface IFELinkMore {
  to?: string;
  caption?: string;
  color?: string;
  onClick?: () => void;
  scrollTop?: boolean;
}

const FELinkMore: React.FC<IFELinkMore> = ({
  to = "#",
  caption = "Selengkapnya",
  color = "rgb(95 90 247)",
  onClick,
  scrollTop = false,
}) => {
  const navigate = useNavigate();

  return (
    <Group
      className="relative w-fit pr-6 cursor-pointer"
      color={color}
      style={{
        color: color,
      }}
      onClick={
        to == "#"
          ? onClick
          : () => {
              navigate(to);

              if (scrollTop) {
                window.scrollTo(0, 0);
              }
            }
      }
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
