import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckIcon from "@mui/icons-material/Check";

import { useSearchRoutes } from "@/lib/useSearchRoutes";

const Option = ({ onClick, isActive, children }) => {
  return (
    <MenuItem onClick={onClick} sx={{ pr: 2, pl: isActive ? 2 : 6 }}>
      {isActive && <CheckIcon sx={{ mr: 1 }} />}
      {children}
    </MenuItem>
  );
};

const options = [
  { label: "Best match", sort: "", order: "" },
  { label: "Most stars", sort: "stars", order: "desc" },
  { label: "Fewest stars", sort: "stars", order: "asc" },
  { label: "Most forks", sort: "forks", order: "desc" },
  { label: "Fewest forks", sort: "forks", order: "asc" },
];

const getInitialOption = ({ sort, order } = {}) => {
  return (
    options.find((o) => o.sort === sort && o.order === order) || options[0]
  );
};

export const SortSelect = ({ query }) => {
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
  const handleClose = (event, option) => {
    setSelected(option);
    setParameters([
      { name: "sort", value: option.sort },
      { name: "order", value: option.order },
    ]);

    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
      >
        Sort by: <strong>{selected?.label}</strong>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
          <Option
            onClick={(e) => handleClose(e, option)}
            key={option.label}
            isActive={selected.label === option.label}
          >
            {option.label}
          </Option>
        ))}
      </Menu>
    </div>
  );
};
