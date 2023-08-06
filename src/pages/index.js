import Head from "next/head";

import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { searchRepositories } from "@/lib/github";

export async function getServerSideProps({ query }) {
  console.log({ query });

  const results = await searchRepositories(query);

  return {
    props: {
      query,
      results,
    },
  };
}

export default function Home({ query, results }) {
  return (
    <>
      <Head>
        <title>Search Github</title>
      </Head>
      <main>
        <SearchForm query={query} />

        <SearchResults results={results} />
      </main>
    </>
  );
}
