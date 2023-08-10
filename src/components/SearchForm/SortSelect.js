import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useSearchRoutes } from "@/lib/useSearchRoutes";
import SortOption from "./SortOption";

const options = [
  { label: "Best match", sort: "", order: "" },
  { label: "Most stars", sort: "stars", order: "desc" },
  { label: "Fewest stars", sort: "stars", order: "asc" },
  { label: "Most forks", sort: "forks", order: "desc" },
  { label: "Fewest forks", sort: "forks", order: "asc" },
];

const getInitialOption = ({ sort, order } = {}) =>
  options.find((o) => o.sort === sort && o.order === order) || options[0];

export default function SortSelect({ query }) {
  const { setParameters } = useSearchRoutes();
  const [selected, setSelected] = useState(getInitialOption(query));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSelected(getInitialOption(query));
  }, [query]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (_event, option) => {
    setAnchorEl(null);

    const isCurrent = selected.label === option.label;
    if (isCurrent) return;

    setSelected(option);
    setParameters({ sort: option.sort, order: option.order });
  };

  return (
    <div>
      <Button
        id="sort-button"
        aria-controls={open ? "sort-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
      >
        Sort by: <strong>{selected?.label}</strong>
      </Button>
      <Menu
        id="sort-menu"
        aria-labelledby="sort-button"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {options.map((option) => (
          <SortOption
            onClick={(e) => handleSelect(e, option)}
            key={option.label}
            isActive={selected.label === option.label}
          >
            {option.label}
          </SortOption>
        ))}
      </Menu>
    </div>
  );
}
