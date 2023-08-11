import { useState, useEffect, useReducer } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";

import ActiveFilterList from "./ActiveFilterList";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";
import { useSearchRoutes } from "@/lib/useSearchRoutes";
import { setStateReducer } from "@/lib/utils";

const defaultState = {
  search: "",
  language: "",
  stars: "",
  followers: "",
};

export default function SearchForm({ query }) {
  const { setParameters } = useSearchRoutes();
  const [state, setState] = useReducer(setStateReducer, defaultState);
  const [filterMenu, setFilterMenu] = useState(false);

  useEffect(() => {
    setState(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setParameters(state);
  };

  const handleReset = (field) => {
    setState({ [field]: "" });
    setParameters({ [field]: "" });
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
            <ActiveFilterList
              query={query}
              setState={setState}
              toggleFilterMenu={() => setFilterMenu(!filterMenu)}
            />
            <SortSelect query={query} />
          </Stack>

          <Collapse in={filterMenu} collapsedSize={0}>
            <Filters state={state} setState={setState} onReset={handleReset} />
          </Collapse>
        </Container>
      </Box>
    </form>
  );
}
