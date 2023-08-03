import React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = [
  {
    title: "Search",
    url: "/",
  },
  {
    title: "History",
    url: "/history",
  },
];

function Navigation() {
  const pathname = usePathname();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fff" }}>
      <Container>
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              maxWidth: "1024px",
            }}
          >
            {pages.map(({ title, url }) => {
              const isActive = pathname === url;
              return (
                <Button
                  key={title}
                  component={NextLink}
                  href={url}
                  variant="text"
                  sx={{ my: 2, display: "block" }}
                  disabled={isActive}
                >
                  {title}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navigation;
