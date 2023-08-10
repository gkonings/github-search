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
          <Avatar alt={result.owner?.name} src={result.owner?.avatarUrl} />
        }
        title={
          <Link href={result.url}>
            <Typography variant="body1">{result.fullName}</Typography>
          </Link>
        }
        subheader={
          <Typography variant="body2">{result.description}</Typography>
        }
      />
      <Stack direction="row">
        <Tag name="language" value={result.language} />
        <Tag name="stars" value={result.starCount} />
        <Tag name="followers" value={result.followerCount} />
      </Stack>
    </Card>
  );
}
