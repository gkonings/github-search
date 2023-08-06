import React, { useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import { useSearchRoutes } from "@/lib/useSearchRoutes";

export const SearchForm = ({ query }) => {
  console.log({ query });

  const { search: initialSearch } = query || {};
  const { setSearchParameters } = useSearchRoutes();
  const [search, setSearch] = useState(initialSearch);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParameters({ search });
  };

  const handleReset = () => {
    setSearch("");
    setSearchParameters({ search: "" });
  };

  return (
    <form onSubmit={handleSearch}>
      <Box sx={{ backgroundColor: "secondary.main" }}>
        <Container
          sx={{
            py: 2,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ my: 1 }}
          >
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              label="search"
              id="search"
              variant="filled"
              sx={{ flexGrow: 1, backgroundColor: "#fff" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="reset"
                      onClick={handleReset}
                      edge="end"
                    >
                      {true && <CancelIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              type="submit"
            >
              Search
            </Button>
          </Stack>
        </Container>
      </Box>
    </form>
  );
};
