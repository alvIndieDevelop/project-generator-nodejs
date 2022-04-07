import { createTheme, responsiveFontSizes } from "@mui/material";

let themeOptions = createTheme({
  palette: {
    mode: "light",
  },
});

themeOptions = responsiveFontSizes(themeOptions);

export { themeOptions };
