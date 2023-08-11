import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { getTagValue } from "@/lib/utils";

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
      <Stack
        direction="row"
        sx={{ px: 1 }}
        spacing={1}
        useFlexGap
        flexWrap="wrap"
      >
        {["language", "stars", "followers", "sort"].map((key) => {
          const value = getTagValue({ key, params });
          if (!value) return null;

          return (
            <Chip
              key={key}
              label={
                <span>
                  {key}: <strong>{value}</strong>
                </span>
              }
            />
          );
        })}
      </Stack>
    </Card>
  );
}
