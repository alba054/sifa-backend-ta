import {
  ButtonStylesParams,
  MantineThemeOverride,
  StackStylesParams,
} from "@mantine/core";
import { COLORS } from "./colors.theme";

export const mantineTheme: MantineThemeOverride = {
  colors: {
    primary: Array(10).fill(COLORS.PRIMARY) as any,
    secondary: Array(10).fill(COLORS.SECONDARY) as any,
    error: Array(10).fill(COLORS.ERROR) as any,
    divider: Array(10).fill(COLORS.DIVIDER) as any,
    light: Array(10).fill(COLORS.LIGHT) as any,
    "table-line": Array(10).fill(COLORS.TABLE_LINE) as any,
  },
  headings: {
    sizes: {
      h1: { fontSize: "104px", fontWeight: "bolder" },
      h2: { fontSize: "66px", fontWeight: "bolder" },
      h3: { fontSize: "52px", fontWeight: "bolder" },
      h4: { fontSize: "38px", fontWeight: "bolder" },
      h5: { fontSize: "26px", fontWeight: "bolder" },
      h6: { fontSize: "22px", fontWeight: "bolder" },
    },
  },
  primaryColor: "primary",
  fontSizes: { xs: 10, sm: 12, md: 14, lg: 16, xl: 18 },
  components: {
    Button: {
      // Subscribe to theme and component params
      styles: (theme, params: ButtonStylesParams) => {
        return {
          root: {
            backgroundColor:
              params.variant === "filled"
                ? `${
                    theme.colors[params.color || theme.primaryColor][9]
                  } !important`
                : undefined,
          },
        };
      },
    },

    Stack: {
      styles: (theme, params: StackStylesParams) => {
        return {
          root: {
            gap:
              typeof params.spacing === "string"
                ? theme.spacing[params.spacing]
                : params.spacing || 0,
          },
        };
      },
    },
  },
};
