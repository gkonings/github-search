import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

export default function ContentContainer({ testId, children }) {
  return (
    <Container data-testid={testId}>
      <Paper sx={{ py: 3, px: 2, mt: -6, mb: 4 }}>{children}</Paper>
    </Container>
  );
}
