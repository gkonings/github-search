import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

const getValue = ({ key, params }) => {
  if (key !== "sort") {
    return params[key];
  }

  if (params.order === "desc") {
    return `most ${params[key]}`;
  }
  if (params.order === "asc") {
    return `fewest ${params[key]}`;
  }

  return null;
};

export default function Item({ paramsString }) {
  const params = Object.fromEntries(new URLSearchParams(paramsString));
  const url = `/?${paramsString}`;

  return (
    <Card variant="outlined" sx={{ px: 1, pb: 2, mb: 2 }}>
      <CardHeader
        title={<Typography variant="body1">{params.search}</Typography>}
        subheader={
          <Link href={url}>
            <Typography variant="body2">{url}</Typography>
          </Link>
        }
      />
      <Stack direction="row" sx={{ px: 1 }}>
        {["language", "stars", "followers", "sort"].map((key) => {
          const value = getValue({ key, params });
          if (!value) return null;

          return (
            <Chip
              key={key}
              label={
                <span>
                  {key}: <strong>{value}</strong>
                </span>
              }
              sx={{ mr: 1 }}
            />
          );
        })}
      </Stack>
    </Card>
  );
}
