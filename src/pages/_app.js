import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "@/lib/theme";
import { Navigation } from "@/components/Navigation";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
