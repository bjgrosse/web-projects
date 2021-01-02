import { buildColorScales } from "./ThemeGenerator";

const materialBase = {
  googleFonts:
    "https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto:400,700&display=swap",
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#ba68c8",
    secondary: "#03dac6",
    gray: "#555",
  },
  fonts: {
    body: "Roboto, sans-serif",
    heading: "inherit",
    monospace: '"Roboto Mono", monospace',
  },
  fontSizes: [10, 12, 14, 16, 20, 24, 34, 48, 60, 96],
  fontWeights: {
    body: 400,
    heading: 400,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.2,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    icon: 24,
    iconButton: 36,
    avatar: 48,
  },
  radii: {
    default: 4,
    button: 6,
    circle: 99999,
  },
  shadows: {
    // source: https://medium.com/@Florian/freebie-google-material-design-shadow-helper-2a0501295a2d
    1: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    2: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    3: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    4: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    5: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [6, 7],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
  appFrame: {
    canvas: {
      bg: "background.main",
    },
  },
  variants: {
    appBar: {
      bg: "primary.main",
      display: "flex",
      alignItems: "center",
      color: "primary.contrast.main",
      fontSize: [4, 5],
    },
    avatar: {
      width: "avatar",
      height: "avatar",
      borderRadius: "circle",
    },
    card: {
      p: 2,
      bg: "background",
      boxShadow: 2,
    },
    link: {
      color: "primary",
    },
    nav: {
      variant: "text.caps",
      fontSize: 1,
      fontWeight: "bold",
      display: "inline-block",
      p: 2,
      color: "inherit",
      textDecoration: "none",
      ":hover,:focus,.active": {
        color: "primary",
      },
    },
  },
  buttons: {
    primary: {
      fontWeight: "bold",
      cursor: "pointer",
      variant: "text.caps",
      fontSize: 2,
      color: "primary.contrast.main",
      bg: "primary.main",
      borderRadius: "button",
      transition: "background 180ms cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        bg: "primary.light",
      },
      "&:active": {
        bg: "primary.dark",
      },
    },
    outline: {
      variant: "buttons.primary",
      color: "primary.main",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
      "&:hover": {
        bg: "primary.contrast.5.6",
      },
      "&:active": {
        bg: "primary.contrast.5.4",
      },
    },
    secondary: {
      variant: "buttons.primary",
      color: "secondary.contrast.main",
      bg: "secondary.main",
    },
    text: {
      variant: "buttons.outline",
      boxShadow: "none",
    },
    icon: {
      borderRadius: "circle",
      bg: "transparent",
      fontSize: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "iconButton",
      height: "iconButton",
      p: 0,
      "&:hover": {
        bg: "whiteAlpha.20",
      },
      "&:active": {
        bg: "blackAlpha.20",
      },
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
    },
  },
};

const colorsDark = {
  text: "#fff",
  background: "#000",
  primary: "#4a148c",
  secondary: "#e65100",
  gray: "#555",
};

function buildAlphaColors(r, g, b) {
  let result = {};
  for (var i = 1; i <= 9; i++) {
    result[i * 10] = `rgba(${r},${g},${b},.${i})`;
  }
  return result;
}
export const GetTheme = (useDarkTheme) => {
  let result = { ...materialBase };
  if (useDarkTheme) {
    result.colors = { ...colorsDark };
  }

  buildColorScales(result.colors);

  result.colors.whiteAlpha = buildAlphaColors(255, 255, 255);
  result.colors.blackAlpha = buildAlphaColors(0, 0, 0);

  return result;
};

export default GetTheme;
