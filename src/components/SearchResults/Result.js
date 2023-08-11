import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Tag from "./Tag";

export default function Result({ result }) {
  return (
    <Card variant="outlined" sx={{ px: 2, pb: 2, mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar alt={result.owner?.login} src={result.owner?.avatar_url} />
        }
        title={
          <Link href={result.html_url}>
            <Typography variant="body1">{result.full_name}</Typography>
          </Link>
        }
        subheader={
          <Typography variant="body2">{result.description}</Typography>
        }
      />
      <Stack direction="row">
        <Tag name="language" value={result.language} />
        <Tag name="stars" value={result.stargazers_count} />
      </Stack>
    </Card>
  );
}
