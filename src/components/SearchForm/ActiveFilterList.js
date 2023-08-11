import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useSearchRoutes } from "@/lib/useSearchRoutes";
import { getTagValue } from "@/lib/utils";

export default function FilterList({ query, setState, toggleFilterMenu }) {
  const { setParameters } = useSearchRoutes();
  const handleDelete = (key) => {
    setState({ [key]: "" });
    setParameters({ [key]: "" });
  };

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      <Button
        onClick={toggleFilterMenu}
        size="small"
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ mr: 1 }}
      >
        Filters
      </Button>

      {["language", "stars", "followers"].map((key) => {
        const value = getTagValue({ key, params: query });
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
