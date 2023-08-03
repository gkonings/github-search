import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = (props) => {
  console.log("SearchForm");
  return (
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
                    onClick={() => {
                      console.log("click");
                    }}
                    edge="end"
                  >
                    {true && <CancelIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" startIcon={<SearchIcon />} type="submit">
            Search
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

SearchForm.displayName = "SearchForm";

SearchForm.propTypes = {};

SearchForm.defaultProps = {};

export default SearchForm;
