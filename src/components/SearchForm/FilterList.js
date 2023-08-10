import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useSearchRoutes } from "@/lib/useSearchRoutes";

export default function FilterList({ state, setState, toggleFilterMenu }) {
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
}
