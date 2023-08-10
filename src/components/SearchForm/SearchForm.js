import { useState, useEffect, useReducer } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

import FilterList from "./FilterList";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import { useSearchRoutes } from "@/lib/useSearchRoutes";

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

export default function SearchForm({ query }) {
  const { setParameters } = useSearchRoutes();
  const [state, setState] = useReducer(reducer, { search: "" });
  const [filterMenu, setFilterMenu] = useState(false);

  console.log({ state });

  useEffect(() => {
    setState(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setParameters(state);
  };

  const handleReset = () => {
    setState({ search: "" });
    setParameters({ search: "" });
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
            search={state?.search}
            onChange={(e) => setState({ search: e.target.value })}
            onReset={handleReset}
          />

          <Stack direction="row" justifyContent="space-between" sx={{ my: 1 }}>
            <FilterList
              state={state}
              setState={setState}
              toggleFilterMenu={() => setFilterMenu(!filterMenu)}
            />
            <SortSelect query={query} />
          </Stack>

          <Collapse in={filterMenu} collapsedSize={0}>
            rest
          </Collapse>
        </Container>
      </Box>
    </form>
  );
}
