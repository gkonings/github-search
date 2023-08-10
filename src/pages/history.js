import Head from "next/head";
import Box from "@mui/material/Box";

import History from "@/components/History";

export default function Home() {
  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <main>
        <Box sx={{ backgroundColor: "secondary.main", py: 6 }} />
        <History />
      </main>
    </>
  );
}
