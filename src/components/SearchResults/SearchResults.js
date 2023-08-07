import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import { Result } from "./Result";

export const SearchResults = ({ results }) => {
  if (!results.length) {
    return (
      <Container>
        <Paper sx={{ px: 2, py: 4, mt: -6, mb: 4 }}>
          no results for this search term, try something else
        </Paper>
      </Container>
    );
  }

  return (
    <Container>
      <Paper sx={{ p: 2, mt: -6, mb: 4 }}>
        <Stack>
          {results.map((result) => {
            return <Result key={result.id} result={result} />;
          })}
        </Stack>
      </Paper>
    </Container>
  );
};
