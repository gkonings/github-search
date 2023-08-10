import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function ResultsContainer({ children }) {
  return (
    <Container>
      <Paper sx={{ p: 2, mt: -6, mb: 4 }}>
        <Stack>{children}</Stack>
      </Paper>
    </Container>
  );
}
