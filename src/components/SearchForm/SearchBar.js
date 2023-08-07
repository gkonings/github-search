import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ search, onChange, onReset }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    spacing={2}
    sx={{ my: 1 }}
  >
    <TextField
      value={search}
      onChange={onChange}
      fullWidth
      label="search"
      id="search"
      variant="filled"
      sx={{ flexGrow: 1, backgroundColor: "#fff" }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="reset" onClick={onReset} edge="end">
              {!!search && <CancelIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <Button variant="contained" startIcon={<SearchIcon />} type="submit">
      Search
    </Button>
  </Stack>
);
