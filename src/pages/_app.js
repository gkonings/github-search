import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navigation from "@/components/Navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0063d3",
    },
    secondary: {
      main: "#ffc917",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
