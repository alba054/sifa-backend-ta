import { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

export const mantineTheme: MantineThemeOverride = {
  headings: {
    fontWeight: 600,
    fontFamily: "Nunito Sans, sans-serif"
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  } as any,
  primaryShade: 5,
  colors: {
    "primary-text": [
      "#657387",
      "#5b697d",
      "#515f73",
      "#475569",
      "#3d4b5f",
      "#334155",
      "#29374b",
      "#1f2d41",
      "#152337",
      "#0b192d",
    ],
    "secondary-text": [
      "#c6d5ea",
      "#bccbe0",
      "#b2c1d6",
      "#a8b7cc",
      "#9eadc2",
      "#94a3b8",
      "#8a99ae",
      "#808fa4",
      "#76859a",
      "#6c7b90",
    ],
    primary: [
      "#918cff",
      "#8782ff",
      "#7d78ff",
      "#736eff",
      "#6964ff",
      "#5f5af7",
      "#5550ed",
      "#4b46e3",
      "#413cd9",
      "#3732cf",
    ],
    error: [
      "#ff5e88",
      "#ff547e",
      "#ff4a74",
      "#ff406a",
      "#ff3660",
      "#ff2c56",
      "#f5224c",
      "#eb1842",
      "#e10e38",
      "#d7042e",
    ],
    background: [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#f5f5f5",
      "#ebebeb",
      "#e1e1e1",
      "#d7d7d7",
    ],
    divider: [
      "#e7f4ff",
      "#ddeaf9",
      "#d3e0ef",
      "#c9d6e5",
      "#bfccdb",
      "#b5c2d1",
      "#abb8c7",
      "#a1aebd",
      "#97a4b3",
      "#8d9aa9",
    ],
    secondary: [
      "#ffffff",
      "#ffffff",
      "#fcfbff",
      "#f2f1ff",
      "#e8e7fb",
      "#deddf1",
      "#d4d3e7",
      "#cac9dd",
      "#c0bfd3",
      "#b6b5c9",
    ],
  },
  primaryColor: "primary",
  fontFamily: "Nunito Sans, sans-serif",
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20
  },
  
  components: {
    Title:{
      defaultProps: { color: "primary-text",  },
    },
    Radio: {
      defaultProps: { color: "primary" },
    },
    InputWrapper: {
      defaultProps: { color: "divider" },
    },
    Input: {
      defaultProps: { color: "divider" },
    },
    Button: {
      defaultProps: { size: "xs" },
      // Subscribe to theme and component params
      styles: (theme, params: ButtonStylesParams) => {
        const buttonFontSize: any = {
          xs: "md",
          sm: "md",
        };

        return {
          root: {
            fontSize: (theme.fontSizes as any)[
              buttonFontSize[params.size] || params.size
            ],
            backgroundColor:
              params.variant === "filled"
                ? `${
                    theme.colors[params.color || theme.primaryColor][9]
                  } !important`
                : undefined,
            paddingLeft: "14px",
            paddingRight: "14px",
            paddingTop: "11px",
            paddingBottom: "11px",
            borderRadius: "8px",
            height: "max-content"
          },
        };
      },
    },
  },
};
