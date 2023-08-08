import { useState, useEffect, useReducer } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";

import { SearchBar } from "./SearchBar";
import { SortSelect } from "./SortSelect";
import { useSearchRoutes } from "@/lib/useSearchRoutes";

const FilterList = ({ state, setState, toggleFilterMenu }) => {
  const { setParameters } = useSearchRoutes();
  const handleDelete = (key) => {
    setState({ [key]: null });
    setParameters({ [key]: null });
  };

  return (
    <Stack direction="row">
      <Button
        onClick={toggleFilterMenu}
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
      >
        Filters
      </Button>

      {["language", "stars", "followers"].map((key) => {
        const value = state[key];
        if (!value) return null;
        return (
          <Chip
            key={key}
            onDelete={() => handleDelete(key)}
            label={
              <span>
                {key}: <strong>{value}</strong>
              </span>
            }
          />
        );
      })}
    </Stack>
  );
};

const reducer = (prevState, updatedProperty) => ({
  ...prevState,
  ...updatedProperty,
});

export const SearchForm = ({ query }) => {
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
          ></SearchBar>

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
};
