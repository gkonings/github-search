import NextLink from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { pages } from "./pages";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Container>
        <Toolbar disableGutters>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Stack direction="row" spacing={2} sx={{ my: 2, display: "flex" }}>
              {pages.map(({ title, url }) => {
                const isActive = pathname === url;
                return (
                  <Button
                    key={title}
                    component={NextLink}
                    href={url}
                    variant="text"
                    sx={{ color: isActive ? "primary.main" : "grey" }}
                  >
                    {title}
                  </Button>
                );
              })}
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
