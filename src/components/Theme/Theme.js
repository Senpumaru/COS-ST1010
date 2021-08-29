import { ruRU } from "@material-ui/core/locale";
import { createMuiTheme, ThemeProvider, styled } from "@material-ui/core/styles";

const theme = createMuiTheme(
  {
    mixins: {
      toolbar: {
        minHeight: 42,
      },
    },
    palette: {
      common: {},
      primary: {
        light: "#101820FF",
        main: "#101820FF",
        dark: "#101820FF",
      },
      secondary: {
        light: "#F2AA4CFF",
        main: "#F2AA4CFF",
        dark: "#F2AA4CFF",
      },
    },
    typography: {
      htmlFontSize: 16,
      fontSize: 14,
      fontFamily: ["Montserrat", "sans-serif"].join(","),

      h2: {},
      h3: {},
      h5: {},

      button: {
        minWidth: 2,
      },
    },
    shape: {
      borderRadius: 0,
    },

    overrides: {
      MuiTableCell: {
        root: {
          paddingTop: 2,
          paddingBottom: 2,
          "&:last-child": {
            paddingRight: 2,
          },
        },
      },
    },
  },
  ruRU
);

export default theme;