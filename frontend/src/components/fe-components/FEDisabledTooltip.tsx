import { Tooltip, useMantineTheme } from '@mantine/core';
import React, { Children } from 'react';

export interface IFEDisabledTooltip {
  label:string,
  maxWidth?:number,
  isDisabled?:boolean,
  children: JSX.Element
}

const FEDisabledTooltip: React.FC<IFEDisabledTooltip> = ({ label, maxWidth=280, isDisabled=false, children }) => {
  const theme= useMantineTheme();
  return (
    <Tooltip
              label={label}
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
                  maxWidth: maxWidth
                },
                arrow: {
                  border: `1px solid ${theme.colors["secondary"][5]}`,
                },
              }}
              disabled={isDisabled}
            >
              <div>
                {children}
              </div>
              </Tooltip>
  )
}
export default FEDisabledTooltip;