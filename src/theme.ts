import { theme as defaultTheme, extendTheme } from "@chakra-ui/react";

import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "425px",
  md: "768px",
  lg: "960px",
  xl: "1280px",
  "2xl": "1440px",
});

const theme = extendTheme({
  fonts: {
    heading: `'Inter', ${defaultTheme.fonts.heading}`,
    body: `'Inter', ${defaultTheme.fonts.body}`,
  },
  breakpoints,
  styles: {
    global: (props: { colorMode: string }) => ({
      "html, body": {
        fontSize: "sm",
        backgroundColor: props.colorMode === "dark" ? "gray.800" : "gray.100",
        color: props.colorMode === "dark" ? "white" : "black.600",
        lineHeight: "tall",
      },
      a: {
        color: props.colorMode === "dark" ? "teal.300" : "teal.500",
        _focus: {
          textDecoration: "none",
          outline: "none",
          border: 0,
          boxShadow: "none !important",
        },
      },
      li: {
        listStyle: "none",
      },
    }),
  },
});

export default theme;
