import Typography from "@mui/material/Typography";

export default function Tag({ name, value }) {
  return value ? (
    <Typography variant="caption" display="block" sx={{ pr: 2 }}>
      <strong>{name}:</strong> {value}
    </Typography>
  ) : null;
}
