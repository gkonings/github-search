import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { SearchBar } from "./SearchBar";
import { SortSelect } from "./SortSelect";
import { useSearchRoutes } from "@/lib/useSearchRoutes";

export const SearchForm = ({ query }) => {
  const { search: initialSearch } = query || {};
  const { setParameters } = useSearchRoutes();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(initialSearch || "");
  }, [initialSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setParameters([{ name: "search", value: search }]);
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
            pt: 2,
            pb: 6,
          }}
        >
          <SearchBar
            search={search}
            onChange={(e) => setSearch(e.target.value)}
            onReset={handleReset}
          ></SearchBar>

          <Stack direction="row" justifyContent="end" sx={{ my: 1 }}>
            <SortSelect query={query} />
          </Stack>
        </Container>
      </Box>
    </form>
  );
};
