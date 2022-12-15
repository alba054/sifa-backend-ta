import { Group, Button, Title } from "@mantine/core";

import React from "react";
import { Link } from "react-router-dom";
import { AddFilled } from "src/assets/Icons/Fluent";

export interface ILFPHeaderButton {
  label: string;
  // type?: "modal" | "href";
  // onClick?: () => void;
  // href?: string;
  type: "modal" | "href";
  onClick?: () => void;
  href?: string;
  icon?: JSX.Element;
  disabled: boolean;
}

interface ILFGHeaderComponentProps {
  title: string;
  buttons: Array<ILFPHeaderButton>;
}

const LFPHeaderComponent: React.FC<ILFGHeaderComponentProps> = ({
  title,
  buttons,
}) => {
  const addIcon = <AddFilled className={`mr-1 mb-[1px]`} size={14} />;
  return (
    <Group position="apart">
      <Title order={2}>{title}</Title>
      <Group>
        {buttons.map((button) => {
          return button.type == "modal" ? (
            <Button
              variant="outline"
              color="primary-text"
              className={`border-[1px] border-[#CACCCE] font-bold disabled`}
              disabled={button.disabled}
              onClick={button.onClick}
              leftIcon={button.icon ?? addIcon}
              styles={{
                leftIcon: {
                  marginRight: "2px !important"
                },
              }}
            >
              {button.label}
            </Button>
          ) : (
            <Button
              variant="outline"
              color="primary-text"
              className="border-[1px] border-[#CACCCE] font-bold"
              disabled={button.disabled}
              component={Link}
              leftIcon={button.icon ?? addIcon}
              to={button.href ?? "#"}
              styles={{
                leftIcon: {
                  marginRight: "2px !important"
                },
              }}
            >
              {button.label}
            </Button>
          );
        })}
      </Group>
      {/* {type == "modal" ? (
        <Button
          variant="outline"
          color="primary-text"
          className="h-[46px] gap-[8px] py-[12px] px-[16px] border-[1px] border-[#CACCCE] rounded-[8px] font-bold"
          onClick={onClick}
        >
          <AddFilled className={`mr-1 mb-[1px]`} size={14} />
          {label}
        </Button>
      ) : (
        <Button
          variant="outline"
          color="primary-text"
          className="h-[46px] gap-[8px] py-[12px] px-[16px] border-[1px] border-[#CACCCE] rounded-[8px] font-bold"
          component={Link}
          to={href}
        >
          <AddFilled className={`mr-1 mb-[1px]`} size={14} />
          {label}
        </Button>
      )} */}
    </Group>
  );
};
export default LFPHeaderComponent;
