import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import { getLoggedInUser } from "@/lib/github/getLoggedInUser";

export const UserInfo = (props) => {
  const [user, setUser] = useState({});
  const { avatarUrl, login, url } = user;

  useEffect(() => {
    const init = async () => {
      setUser(await getLoggedInUser());
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack direction="row" spacing={2}>
      <IconButton href={url} target="_blank">
        <Avatar alt={login} src={avatarUrl} />
      </IconButton>
    </Stack>
  );
};