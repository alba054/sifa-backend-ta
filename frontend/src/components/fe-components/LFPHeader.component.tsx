import { Group, Button, Title, Tooltip, useMantineTheme } from "@mantine/core";

import React from "react";
import { Link } from "react-router-dom";
import { AddFilled } from "src/assets/Icons/Fluent";
import FERoundedChip from "./FERoundedChip";

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
  buttons?: Array<ILFPHeaderButton>;
  disabledButtonTooltipLabel?: string;
  chipLabel?: string;
}

const LFPHeaderComponent: React.FC<ILFGHeaderComponentProps> = ({
  title,
  buttons,
  disabledButtonTooltipLabel = "Hapus permohonan yang lama untuk membuat permohonan yang baru",
  chipLabel,
}) => {
  const addIcon = <AddFilled className={`mr-1 mb-[1px]`} size={14} />;
  const theme = useMantineTheme();
  return (
    <Group position="apart">
      <Group>
        <Title order={2}>{title}</Title>
        {chipLabel != null ? (
          <div className="relative -bottom-0.5">
            {<FERoundedChip label={chipLabel} type="gray" />}
          </div>
        ) : null}
      </Group>
      <Group>
        {buttons?.map((button, e: number) => {
          return (
            <Tooltip
              key={`tooltip-${e}`}
              label={disabledButtonTooltipLabel}
              withArrow
              color={"rgba(255, 255, 255, 0.9)"}
              position="bottom-end"
              multiline
              // width={280}
              radius={"md"}
              openDelay={100}
              styles={{
                tooltip: {
                  color: theme.colors["primary-text"][5],
                  border: `1px solid ${theme.colors["secondary"][5]}`,
                  padding: "8px 16px",
                  // textAlign: "justify",
                  letterSpacing: "0.015em",
                  maxWidth: "280px",
                },
                arrow: {
                  border: `1px solid ${theme.colors["secondary"][5]}`,
                },
              }}
              disabled={!button.disabled}
            >
              <div>
                {button.type == "modal" ? (
                  <Button
                    key={e}
                    variant="outline"
                    color="primary-text"
                    className={`border-[1px] border-[#CACCCE] font-bold disabled`}
                    disabled={button.disabled}
                    onClick={button.onClick}
                    leftIcon={button.icon ?? addIcon}
                    styles={{
                      leftIcon: {
                        marginRight: "2px !important",
                      },
                    }}
                  >
                    {button.label}
                  </Button>
                ) : (
                  <Button
                    key={e}
                    variant="outline"
                    color="primary-text"
                    className="border-[1px] border-[#CACCCE] font-bold"
                    disabled={button.disabled}
                    component={Link}
                    leftIcon={button.icon ?? addIcon}
                    to={button.href ?? "#"}
                    styles={{
                      leftIcon: {
                        marginRight: "2px !important",
                      },
                    }}
                  >
                    {button.label}
                  </Button>
                )}
              </div>
            </Tooltip>
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
