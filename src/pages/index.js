import Head from "next/head";

import Button from "@mui/material/Button";

import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Search Github</title>
      </Head>
      <main>
        <SearchForm />
      </main>
    </>
  );
}
