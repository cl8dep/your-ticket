import { Roboto } from 'next/font/google';
import { createTheme as createMuiTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


interface CreateThemeOptions {
  prefersLightMode: boolean;
}

// Create a theme instance.
export function createTheme({ prefersLightMode }: CreateThemeOptions) {
  return createMuiTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    palette: {
      mode: prefersLightMode ? "light" : "dark",
      primary: {
        main: prefersLightMode ? "hsl(213, 100%, 52%)" : "hsl(213, 100%, 73%)",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          underline: "hover",
        },
      },
    },
  });
}

