type TColorsKey =
  | "PRIMARY"
  | "SECONDARY"
  | "ERROR"
  | "DIVIDER"
  | "LIGHT"
  | "TABLE_LINE";

export const TEXT_COLORS = {
  PRIMARY: "#334155",
  SECONDARY: "#94A3B8",
};

export const COLORS: { [key in TColorsKey]: string } = {
  PRIMARY: "#5F5AF7",
  SECONDARY: "#DEDDF1",
  ERROR: "#FF2C56",
  DIVIDER: "#B5C2D1",
  LIGHT: "#FFFFFF",
  TABLE_LINE: "#DFDFDF",
};
