import Stack from "@mui/material/Stack";

import NumberFilter from "./NumberFilter";
import TextFilter from "./TextFilter";

export default function Filters({ state, setState, onReset }) {
  const { language, stars, followers } = state;

  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      spacing={4}
      sx={{ mt: 1, mb: 2 }}
      justifyContent="space-between"
    >
      <NumberFilter
        name="stars"
        value={stars}
        setState={setState}
        onReset={onReset}
      />
      <NumberFilter
        name="followers"
        value={followers}
        setState={setState}
        onReset={onReset}
      />
      <TextFilter
        name="language"
        value={language}
        setState={setState}
        onReset={onReset}
      />
    </Stack>
  );
}
